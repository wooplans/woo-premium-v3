"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PlanActions({ planId }: { planId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce plan ?")) return;

    await fetch(`/api/plans/${planId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <Link
        href={`/admin/plans/edit?id=${planId}`}
        className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        Modifier
      </Link>
      <button
        onClick={handleDelete}
        className="px-3 py-1.5 text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
      >
        Supprimer
      </button>
    </div>
  );
}
