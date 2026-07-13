"use client";

import { Trash2, Shapes } from "lucide-react";
import { useAnnotationStore } from "@/store/annotationStore";

export default function PolygonList() {
  const { polygons, removePolygon, currentImage } = useAnnotationStore();

  if (!currentImage) {
    return (
      <div className="rounded-2xl border border-[#DCE3D7] bg-white p-4">
        <p className="text-sm text-[#9CA79E]">No image selected.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#DCE3D7] bg-white">
      <div className="border-b border-[#DCE3D7] px-4 py-3">
        <h3 className="flex items-center gap-2 font-[Manrope,sans-serif] text-sm font-bold text-[#16241D]">
          <Shapes size={16} className="text-[#2A8C7A]" />
          Annotations
          <span className="ml-auto rounded-full bg-[#E4F3EF] px-2 py-0.5 font-mono text-xs font-semibold text-[#2A8C7A]">
            {polygons.length}
          </span>
        </h3>
      </div>

      <div className="max-h-72 overflow-y-auto">
        {polygons.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-[#9CA79E]">
            No annotations yet.
            <br />
            Switch to Draw mode to start.
          </div>
        ) : (
          <ul className="divide-y divide-[#EEF0EA]">
            {polygons.map((poly, i) => (
              <li
                key={poly.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-[#F7F8F3]"
              >
                <div>
                  <p className="text-sm font-semibold text-[#16241D]">
                    {poly.label || `Annotation ${i + 1}`}
                  </p>
                  <p className="font-mono text-xs text-[#9CA79E]">
                    {poly.points.length} points
                  </p>
                </div>

                <button
                  onClick={() => removePolygon(poly.id)}
                  title="Delete annotation"
                  className="rounded-lg p-2 text-[#C3CBC5] hover:bg-[#FBE7E7] hover:text-[#C43D3D]"
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