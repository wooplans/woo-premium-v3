import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const env = process.env as unknown as CloudflareEnv;
  const bucket = env.BUCKET;

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
  }

  const key = `${Date.now()}-${file.name}`;
  await bucket.put(key, file.stream());

  return NextResponse.json({ key, url: `/api/upload/${key}` }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const env = process.env as unknown as CloudflareEnv;
  const bucket = env.BUCKET;

  const { key } = (await request.json()) as { key: string };
  if (!key) {
    return NextResponse.json({ error: "Clé manquante" }, { status: 400 });
  }

  await bucket.delete(key);
  return NextResponse.json({ success: true });
}
