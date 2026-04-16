import Link from "next/link";
import Navbar from "@/components/navbar";
import PlanCard from "@/components/plan-card";
import { getDb } from "@/lib/db";
import { getPlans } from "@/lib/db/queries";
import { PlanType } from "@/types/plan";
import { Plan } from "@/lib/db/schema";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const type = params.type as PlanType | undefined;

  let plansList: Plan[] = [];
  try {
    const db = getDb();
    plansList = await getPlans(db, {
      type: type,
      publishedOnly: true,
    });
  } catch {
    plansList = [];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Plans Architecturaux
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez notre collection de plans pour duplex et villas
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <Link
            href="/"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              !type ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Tous
          </Link>
          <Link
            href="/?type=duplex"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              type === "duplex" ? "bg-blue-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Duplex
          </Link>
          <Link
            href="/?type=villa"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              type === "villa" ? "bg-amber-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Villa
          </Link>
        </div>

        {plansList.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="text-lg">Aucun plan disponible pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plansList.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
