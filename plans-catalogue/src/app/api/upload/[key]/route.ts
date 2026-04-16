import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const env = process.env as unknown as CloudflareEnv;
  const bucket = env.BUCKET;

  const object = await bucket.get(key);
  if (!object) {
    return NextResponse.json({ error: "Fichier non trouvé" }, { status: 404 });
  }

  const headers = new Headers();
  headers.set("Cache-Control", "public, max-age=31536000");
  headers.set("Content-Type", object.httpMetadata?.contentType || "application/octet-stream");

  return new NextResponse(object.body as ReadableStream, { headers });
}
