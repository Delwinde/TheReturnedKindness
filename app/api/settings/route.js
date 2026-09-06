import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/data";
import { isAuthed } from "@/lib/requireAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const body = await request.json();
  const allowedKeys = [
    "facebook",
    "instagram",
    "linkedin",
    "x",
    "tiktok",
    "youtube",
    "keywords",
    "metaDescription",
  ];
  const update = {};
  for (const key of allowedKeys) {
    if (key in body) update[key] = String(body[key] ?? "");
  }
  const saved = await saveSettings(update);
  return NextResponse.json(saved);
}
