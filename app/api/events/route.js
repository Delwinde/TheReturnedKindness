import { NextResponse } from "next/server";
import { getCollection, saveCollection, makeId } from "@/lib/data";
import { isAuthed } from "@/lib/requireAuth";

export async function GET() {
  const events = await getCollection("events");
  const sorted = [...events].sort((a, b) => (a.date < b.date ? 1 : -1));
  return NextResponse.json(sorted);
}

export async function POST(request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const body = await request.json();
  if (!body.title || !body.date) {
    return NextResponse.json(
      { error: "Title and date are required" },
      { status: 400 }
    );
  }
  const events = await getCollection("events");
  const event = {
    id: makeId(),
    title: body.title,
    date: body.date,
    location: body.location || "",
    summary: body.summary || "",
    image: body.image || "",
  };
  const updated = [event, ...events];
  await saveCollection("events", updated);
  return NextResponse.json(event, { status: 201 });
}
