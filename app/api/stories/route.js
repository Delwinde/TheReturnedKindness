import { NextResponse } from "next/server";
import { getCollection, saveCollection, makeId } from "@/lib/data";
import { isAuthed } from "@/lib/requireAuth";

export async function GET() {
  const stories = await getCollection("stories");
  const sorted = [...stories].sort((a, b) => (a.date < b.date ? 1 : -1));
  return NextResponse.json(sorted);
}

export async function POST(request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const body = await request.json();
  if (!body.title || !body.body) {
    return NextResponse.json(
      { error: "Title and story content are required" },
      { status: 400 }
    );
  }
  const stories = await getCollection("stories");
  const story = {
    id: makeId(),
    title: body.title,
    date: body.date || new Date().toISOString().slice(0, 10),
    excerpt: body.excerpt || body.body.slice(0, 140),
    body: body.body,
    image: body.image || "",
  };
  const updated = [story, ...stories];
  await saveCollection("stories", updated);
  return NextResponse.json(story, { status: 201 });
}
