import { NextResponse } from "next/server";
import { getCollection, saveCollection } from "@/lib/data";
import { isAuthed } from "@/lib/requireAuth";

export async function DELETE(_request, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const messages = await getCollection("messages");
  const updated = messages.filter((m) => m.id !== params.id);
  await saveCollection("messages", updated);
  return NextResponse.json({ ok: true });
}
