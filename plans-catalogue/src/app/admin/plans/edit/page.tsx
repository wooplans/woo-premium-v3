import PlanForm from "@/components/plan-form";
import { getDb } from "@/lib/db";
import { getPlanById } from "@/lib/db/queries";
import { PlanFormData } from "@/types/plan";

export default async function EditPlanPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;
  let plan = null;
  try {
    const db = getDb();
    plan = await getPlanById(db, id);
  } catch {}

  if (!plan) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-500">Plan non trouvé.</p>
      </div>
    );
  }

  const initialData: PlanFormData = {
    title: plan.title,
    type: plan.type as "duplex" | "villa",
    description: plan.description || "",
    surface: plan.surface,
    bedrooms: plan.bedrooms,
    bathrooms: plan.bathrooms,
    floors: plan.floors,
    price: plan.price,
    features: (plan.features as string[]) || [],
    thumbnail: plan.thumbnail || "",
    images: (plan.images as string[]) || [],
    isPublished: plan.isPublished ?? false,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Modifier le plan</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <PlanForm planId={plan.id} initialData={initialData} />
      </div>
    </div>
  );
}
