"use client";

import { Trash2, Shapes } from "lucide-react";
import { useAnnotationStore } from "@/store/annotationStore";

export default function PolygonList() {
  const { polygons, removePolygon, currentImage } = useAnnotationStore();

  if (!currentImage) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-400">No image selected.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <Shapes size={16} className="text-blue-500" />
          Annotations
          <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-600">
            {polygons.length}
          </span>
        </h3>
      </div>

      <div className="max-h-72 overflow-y-auto">
        {polygons.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-slate-400">
            No annotations yet.
            <br />
            Switch to Draw mode to start.
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {polygons.map((poly, i) => (
              <li
                key={poly.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-slate-50"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {poly.label || `Annotation ${i + 1}`}
                  </p>
                  <p className="text-xs text-slate-400">
                    {poly.points.length} points
                  </p>
                </div>

                <button
                  onClick={() => removePolygon(poly.id)}
                  title="Delete annotation"
                  className="rounded-lg p-2 text-slate-300 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={15} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
