import PlanForm from "@/components/plan-form";

export default function NewPlanPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nouveau plan</h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <PlanForm />
      </div>
    </div>
  );
}
