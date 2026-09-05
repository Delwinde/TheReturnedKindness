import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const hasUrl = Boolean(process.env.KV_REST_API_URL);
  const hasToken = Boolean(process.env.KV_REST_API_TOKEN);

  if (!hasUrl || !hasToken) {
    return NextResponse.json({
      connected: false,
      reason: "Missing environment variables",
      hasUrl,
      hasToken,
      message:
        "KV_REST_API_URL and/or KV_REST_API_TOKEN are not visible to this deployment. Double-check a KV database is actually attached to this exact Vercel project, then redeploy.",
    });
  }

  try {
    const { kv } = await import("@vercel/kv");
    const testValue = `ok-${Date.now()}`;
    await kv.set("debug_connection_test", testValue);
    const readBack = await kv.get("debug_connection_test");
    return NextResponse.json({
      connected: readBack === testValue,
      hasUrl,
      hasToken,
      wrote: testValue,
      readBack,
      message:
        readBack === testValue
          ? "Success \u2014 the database is connected and working."
          : "The database responded, but the round-trip value didn't match. Something is misconfigured.",
    });
  } catch (err) {
    return NextResponse.json({
      connected: false,
      hasUrl,
      hasToken,
      error: String(err && err.message ? err.message : err),
      message:
        "The database connection attempt failed. See the error above for details.",
    });
  }
}
