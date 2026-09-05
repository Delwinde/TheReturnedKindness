import { NextResponse } from "next/server";
import { getCollection, saveCollection, makeId } from "@/lib/data";
import { isAuthed } from "@/lib/requireAuth";

export async function GET() {
  const founders = await getCollection("founders");
  return NextResponse.json(founders);
}

export async function POST(request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  const founders = await getCollection("founders");
  const founder = {
    id: makeId(),
    name: body.name,
    role: body.role || "",
    bio: body.bio || "",
    photo: body.photo || "",
  };
  const updated = [...founders, founder];
  await saveCollection("founders", updated);
  return NextResponse.json(founder, { status: 201 });
}
