import Link from "next/link";
import { Plan } from "@/lib/db/schema";

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <Link href={`/plans/${plan.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
        <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
          {plan.thumbnail ? (
            <img
              src={plan.thumbnail}
              alt={plan.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
              plan.type === "duplex"
                ? "bg-blue-100 text-blue-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {plan.type}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-lg mb-2">{plan.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {plan.surface && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                {plan.surface} m²
              </span>
            )}
            {plan.bedrooms && (
              <span>{plan.bedrooms} ch.</span>
            )}
            {plan.bathrooms && (
              <span>{plan.bathrooms} sdb</span>
            )}
          </div>
          {plan.price != null && (
            <p className="mt-3 text-lg font-bold text-gray-900">
              {plan.price.toLocaleString("fr-FR")} FCFA
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
