import { plans, Plan } from "@/lib/db/schema";
import { PlanType } from "@/types/plan";
import { SQL, eq, and } from "drizzle-orm";

type DbClient = ReturnType<typeof import("@/lib/db")["getDb"]>;

export async function getPlans(db: DbClient, options?: { type?: PlanType; publishedOnly?: boolean }) {
  const conditions: SQL[] = [];

  if (options?.type) {
    conditions.push(eq(plans.type, options.type));
  }
  if (options?.publishedOnly) {
    conditions.push(eq(plans.isPublished, true));
  }

  if (conditions.length > 0) {
    return db.select().from(plans).where(and(...conditions)).orderBy(plans.createdAt);
  }
  return db.select().from(plans).orderBy(plans.createdAt);
}

export async function getPlanById(db: DbClient, id: string): Promise<Plan | null> {
  const result = await db.select().from(plans).where(eq(plans.id, id));
  return result[0] || null;
}

export async function createPlan(db: DbClient, data: typeof plans.$inferInsert) {
  await db.insert(plans).values(data);
}

export async function updatePlan(db: DbClient, id: string, data: Partial<typeof plans.$inferInsert>) {
  await db.update(plans).set({ ...data, updatedAt: new Date().toISOString() }).where(eq(plans.id, id));
}

export async function deletePlan(db: DbClient, id: string) {
  await db.delete(plans).where(eq(plans.id, id));
}
