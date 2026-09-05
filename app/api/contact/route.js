import { NextResponse } from "next/server";
import { getCollection, saveCollection, makeId } from "@/lib/data";
import { isAuthed } from "@/lib/requireAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const messages = await getCollection("messages");
  const sorted = [...messages].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  return NextResponse.json(sorted);
}

export async function POST(request) {
  const body = await request.json();
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }
  const messages = await getCollection("messages");
  const entry = {
    id: makeId(),
    name: body.name,
    email: body.email,
    message: body.message,
    createdAt: new Date().toISOString(),
  };
  await saveCollection("messages", [entry, ...messages]);
  return NextResponse.json({ ok: true });
}
