import { NextResponse } from "next/server";
import { getCollection, saveCollection } from "@/lib/data";
import { isAuthed } from "@/lib/requireAuth";

export async function PUT(request, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const body = await request.json();
  const events = await getCollection("events");
  const index = events.findIndex((e) => e.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  const updatedEvent = { ...events[index], ...body, id: params.id };
  const updated = [...events];
  updated[index] = updatedEvent;
  await saveCollection("events", updated);
  return NextResponse.json(updatedEvent);
}

export async function DELETE(_request, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const events = await getCollection("events");
  const updated = events.filter((e) => e.id !== params.id);
  await saveCollection("events", updated);
  return NextResponse.json({ ok: true });
}
