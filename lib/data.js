import { seedFounders, seedEvents, seedStories } from "./seed";

// Vercel KV (Upstash Redis under the hood) is only wired up once you attach
// a KV database to the project in the Vercel dashboard, which sets
// KV_REST_API_URL / KV_REST_API_TOKEN automatically. Until then (e.g. while
// running `next dev` locally without those env vars) we fall back to a
// process-memory store so the app still runs — content just won't persist
// between server restarts.
let kv = null;
let memory = null;

function hasKvEnv() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function getKv() {
  if (!hasKvEnv()) return null;
  if (!kv) {
    const mod = await import("@vercel/kv");
    kv = mod.kv;
  }
  return kv;
}

function getMemory() {
  if (!memory) {
    memory = {
      stories: [...seedStories],
      events: [...seedEvents],
      founders: [...seedFounders],
      messages: [],
    };
  }
  return memory;
}

const SEEDS = { stories: seedStories, events: seedEvents, founders: seedFounders };

export async function getCollection(key) {
  const client = await getKv();
  const seed = SEEDS[key] || [];
  if (client) {
    const existing = await client.get(key);
    if (existing && Array.isArray(existing)) return existing;
    await client.set(key, seed);
    return seed;
  }
  const mem = getMemory();
  if (!(key in mem)) mem[key] = [];
  return mem[key];
}

export async function saveCollection(key, items) {
  const client = await getKv();
  if (client) {
    await client.set(key, items);
    return;
  }
  getMemory()[key] = items;
}

export function makeId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// Site-wide settings: social links + SEO fields. This is a single object,
// not a list, so it gets its own get/save pair rather than using
// getCollection/saveCollection above.
export const DEFAULT_SETTINGS = {
  facebook: "",
  instagram: "",
  linkedin: "",
  x: "",
  tiktok: "",
  youtube: "",
  keywords:
    "The Returned Kindness, charity Accra, non-profit Ghana, community outreach Ghana, civic organization Accra, giving back Ghana",
  metaDescription:
    "The Returned Kindness is a charity club in Accra, Ghana, putting a smile on the faces of the less privileged through community outreach and support.",
};

export async function getSettings() {
  const client = await getKv();
  if (client) {
    const existing = await client.get("settings");
    if (existing && typeof existing === "object" && !Array.isArray(existing)) {
      return { ...DEFAULT_SETTINGS, ...existing };
    }
    await client.set("settings", DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS };
  }
  const mem = getMemory();
  if (!mem.settings) mem.settings = { ...DEFAULT_SETTINGS };
  return mem.settings;
}

export async function saveSettings(update) {
  const current = await getSettings();
  const merged = { ...current, ...update };
  const client = await getKv();
  if (client) {
    await client.set("settings", merged);
  } else {
    getMemory().settings = merged;
  }
  return merged;
}
