import Link from "next/link";
import Navbar from "@/components/navbar";
import PlanGallery from "@/components/plan-gallery";
import { getDb } from "@/lib/db";
import { getPlanById } from "@/lib/db/queries";
import { notFound } from "next/navigation";

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let plan = null;
  try {
    const env = process.env as unknown as CloudflareEnv;
    const db = getDb(env.DB);
    plan = await getPlanById(db, id);
  } catch {}

  if (!plan) {
    notFound();
  }

  const features: string[] = (plan.features as string[]) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour au catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <PlanGallery images={(plan.images as string[]) || []} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-3 ${
                  plan.type === "duplex"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {plan.type}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">{plan.title}</h1>
            </div>

            {plan.price != null && (
              <div className="text-2xl font-bold text-gray-900">
                {plan.price.toLocaleString("fr-FR")} FCFA
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {plan.surface && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{plan.surface}</div>
                  <div className="text-sm text-gray-500">m²</div>
                </div>
              )}
              {plan.bedrooms && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{plan.bedrooms}</div>
                  <div className="text-sm text-gray-500">Chambres</div>
                </div>
              )}
              {plan.bathrooms && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{plan.bathrooms}</div>
                  <div className="text-sm text-gray-500">Salles de bain</div>
                </div>
              )}
              {plan.floors && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{plan.floors}</div>
                  <div className="text-sm text-gray-500">Étages</div>
                </div>
              )}
            </div>

            {plan.description && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {plan.description}
                </p>
              </div>
            )}

            {features.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Caractéristiques</h2>
                <div className="flex flex-wrap gap-2">
                  {features.map((f, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-sm"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
