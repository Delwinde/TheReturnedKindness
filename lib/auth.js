// Lightweight signed-cookie auth. No database, no third-party auth provider.
// The admin "password" lives in the ADMIN_PASSWORD environment variable.
// A session cookie is just: `${expiry}.${signature}` where signature is an
// HMAC-SHA256 of the expiry, keyed with ADMIN_PASSWORD. Anyone without the
// password can't forge a valid signature, and the cookie expires on its own.

const SESSION_COOKIE = "trk_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function getKey(secret) {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken() {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD is not set");
  const expiry = Date.now() + SESSION_TTL_SECONDS * 1000;
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(String(expiry))
  );
  return `${expiry}.${toHex(sig)}`;
}

export async function verifySessionToken(token) {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [expiry, sig] = parts;
  if (Number(expiry) < Date.now()) return false;
  const key = await getKey(secret);
  const expectedSig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(String(expiry))
  );
  return toHex(expectedSig) === sig;
}

export function checkPassword(candidate) {
  const secret = process.env.ADMIN_PASSWORD;
  return Boolean(secret) && candidate === secret;
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;
