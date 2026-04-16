import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
  }

  const key = `${Date.now()}-${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const filePath = path.join(process.cwd(), "public", "uploads", key);

  await writeFile(filePath, buffer);

  return NextResponse.json({ key, url: `/uploads/${key}` }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { key } = (await request.json()) as { key: string };
  if (!key) {
    return NextResponse.json({ error: "Clé manquante" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "public", "uploads", key);
  try {
    await unlink(filePath);
  } catch {}
  return NextResponse.json({ success: true });
}
