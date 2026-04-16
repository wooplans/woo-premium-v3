import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getPlanById, updatePlan, deletePlan } from "@/lib/db/queries";
import { PlanFormData } from "@/types/plan";

export const runtime = "edge";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const env = process.env as unknown as CloudflareEnv;
  const db = getDb(env.DB);

  const plan = await getPlanById(db, id);
  if (!plan) {
    return NextResponse.json({ error: "Plan non trouvé" }, { status: 404 });
  }
  return NextResponse.json(plan);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const env = process.env as unknown as CloudflareEnv;
  const db = getDb(env.DB);

  const body: Partial<PlanFormData> = await request.json();
  await updatePlan(db, id, body);

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const env = process.env as unknown as CloudflareEnv;
  const db = getDb(env.DB);

  await deletePlan(db, id);

  return NextResponse.json({ success: true });
}
