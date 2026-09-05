import { NextResponse } from "next/server";
import { getCollection, saveCollection } from "@/lib/data";
import { isAuthed } from "@/lib/requireAuth";

export const dynamic = "force-dynamic";

export async function PUT(request, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const body = await request.json();
  const founders = await getCollection("founders");
  const index = founders.findIndex((f) => f.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Founder not found" }, { status: 404 });
  }
  const updatedFounder = { ...founders[index], ...body, id: params.id };
  const updated = [...founders];
  updated[index] = updatedFounder;
  await saveCollection("founders", updated);
  return NextResponse.json(updatedFounder);
}

export async function DELETE(_request, { params }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
  const founders = await getCollection("founders");
  const updated = founders.filter((f) => f.id !== params.id);
  await saveCollection("founders", updated);
  return NextResponse.json({ ok: true });
}
