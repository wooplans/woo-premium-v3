import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getPlans, createPlan } from "@/lib/db/queries";
import { v4 as uuidv4 } from "uuid";
import { PlanType, PlanFormData } from "@/types/plan";

export async function GET(request: NextRequest) {
  const db = getDb();

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") as PlanType | null;
  const publishedOnly = searchParams.get("published") === "true";

  const result = await getPlans(db, {
    type: type || undefined,
    publishedOnly,
  });

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const db = getDb();

  const body: PlanFormData = await request.json();
  const id = uuidv4();

  await createPlan(db, {
    id,
    title: body.title,
    type: body.type,
    description: body.description || "",
    surface: body.surface || null,
    bedrooms: body.bedrooms || null,
    bathrooms: body.bathrooms || null,
    floors: body.floors || null,
    price: body.price || null,
    features: body.features || [],
    thumbnail: body.thumbnail || "",
    images: body.images || [],
    isPublished: body.isPublished || false,
  });

  return NextResponse.json({ id }, { status: 201 });
}
