import { NextResponse } from "next/server";
import { getCollection, saveCollection } from "@/lib/data";
import { isAuthed } from "@/lib/requireAuth";

export async function PUT(request, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const body = await request.json();
  const stories = await getCollection("stories");
  const index = stories.findIndex((s) => s.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Story not found" }, { status: 404 });
  }
  const updatedStory = { ...stories[index], ...body, id: params.id };
  const updated = [...stories];
  updated[index] = updatedStory;
  await saveCollection("stories", updated);
  return NextResponse.json(updatedStory);
}

export async function DELETE(_request, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const stories = await getCollection("stories");
  const updated = stories.filter((s) => s.id !== params.id);
  await saveCollection("stories", updated);
  return NextResponse.json({ ok: true });
}
