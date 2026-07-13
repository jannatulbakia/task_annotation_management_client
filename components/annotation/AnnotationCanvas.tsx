"use client";

import { useRef, useState, useCallback } from "react";
import AuthenticatedImage from "@/components/annotation/AuthenticatedImage";
import { useAnnotationStore } from "@/store/annotationStore";

interface LabelModalProps {
  onSave: (label: string) => void;
  onCancel: () => void;
}

function LabelModal({ onSave, onCancel }: LabelModalProps) {
  const [label, setLabel] = useState("");
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="w-80 rounded-2xl bg-white p-6 shadow-2xl">
        <h3 className="mb-4 font-[Manrope,sans-serif] text-lg font-bold text-[#16241D]">
          Label this annotation
        </h3>
        <input
          autoFocus
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Tumor, Lesion, ROI…"
          className="w-full rounded-xl border border-[#DCE3D7] p-3 text-sm text-[#16241D] outline-none focus:border-[#2A8C7A] focus:ring-2 focus:ring-[#2A8C7A]/20"
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave(label || "Annotation");
            if (e.key === "Escape") onCancel();
          }}
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-xl border border-[#DCE3D7] px-4 py-2 text-sm text-[#5C6B62] hover:bg-[#F7F8F3]"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(label || "Annotation")}
            className="rounded-xl bg-[#2A8C7A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#237567]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AnnotationCanvas() {
  const {
    currentImage,
    polygons,
    mode,
    draftPoints,
    addDraftPoint,
    clearDraft,
    savePolygon,
  } = useAnnotationStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<number[] | null>(null);
  const [labelModalOpen, setLabelModalOpen] = useState(false);
  const [hoveredPolygon, setHoveredPolygon] = useState<number | null>(null);

  // Convert a mouse event to percentage coordinates [0–100, 0–100]
  const toPercentage = useCallback(
    (e: React.MouseEvent): number[] => {
      const rect = containerRef.current!.getBoundingClientRect();
      return [
        ((e.clientX - rect.left) / rect.width) * 100,
        ((e.clientY - rect.top) / rect.height) * 100,
      ];
    },
    []
  );

  // Convert percentage coords to SVG viewBox coords (0–1000)
  const toSVG = (p: number[]): string => `${p[0] * 10},${p[1] * 10}`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (mode !== "draw") return;
    setCursor(toPercentage(e));
  };

  const handleMouseLeave = () => setCursor(null);

  const handleClick = (e: React.MouseEvent) => {
    if (mode !== "draw") return;
    // Prevent double-click from adding two points
    if (e.detail > 1) return;

    const pt = toPercentage(e);

    // Close polygon if clicking near the first point
    if (draftPoints.length >= 3) {
      const [fx, fy] = draftPoints[0];
      const dist = Math.sqrt((pt[0] - fx) ** 2 + (pt[1] - fy) ** 2);
      if (dist < 2.5) {
        setLabelModalOpen(true);
        return;
      }
    }

    addDraftPoint(pt);
  };

  const handleDoubleClick = () => {
    if (mode !== "draw" || draftPoints.length < 3) return;
    setLabelModalOpen(true);
  };

  const handleSaveLabel = async (label: string) => {
    setLabelModalOpen(false);
    await savePolygon(label);
  };

  const handleCancelLabel = () => {
    setLabelModalOpen(false);
    clearDraft();
  };

  if (!currentImage) {
    return (
      <div className="flex h-full min-h-[350px] items-center justify-center rounded-2xl border-2 border-dashed border-[#DCE3D7] bg-white text-[#9CA79E] sm:min-h-[500px]">
        <p className="px-4 text-center text-sm sm:text-base">
          Upload an image to begin annotating
        </p>
      </div>
    );
  }

  return (
    <>
      {labelModalOpen && (
        <LabelModal onSave={handleSaveLabel} onCancel={handleCancelLabel} />
      )}

      <div
        ref={containerRef}
        className={`relative min-h-[300px] select-none overflow-hidden rounded-2xl border border-[#DCE3D7] bg-[#16241D] sm:min-h-[400px] ${
          mode === "draw" ? "cursor-crosshair" : "cursor-default"
        }`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* The image */}
        <AuthenticatedImage
          imageId={currentImage.id}
          src={currentImage.image}
          alt="Radiology scan"
          className="block h-full max-h-[600px] w-full object-contain"
          draggable={false}
        />

        {/* SVG overlay – same dimensions as the container */}
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {/* Saved polygons */}
          {polygons.map((poly) => {
            const pts = poly.points.map(toSVG).join(" ");
            const isHovered = hoveredPolygon === poly.id;
            return (
              <g
                key={poly.id}
                className="pointer-events-auto"
                onMouseEnter={() => setHoveredPolygon(poly.id)}
                onMouseLeave={() => setHoveredPolygon(null)}
              >
                <polygon
                  points={pts}
                  fill={isHovered ? "rgba(42,140,122,0.28)" : "rgba(42,140,122,0.14)"}
                  stroke={isHovered ? "#2A8C7A" : "#5FB3A3"}
                  strokeWidth={isHovered ? "3" : "2"}
                  className="transition-all duration-150"
                />
                {/* Label */}
                {poly.points.length > 0 && (
                  <text
                    x={poly.points[0][0] * 10}
                    y={poly.points[0][1] * 10 - 6}
                    fill="white"
                    fontSize="18"
                    fontWeight="bold"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    {poly.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Draft polygon being drawn */}
          {draftPoints.length > 0 && (
            <g>
              {/* Filled area for the partial polygon */}
              {draftPoints.length >= 3 && (
                <polygon
                  points={draftPoints.map(toSVG).join(" ")}
                  fill="rgba(232,163,61,0.15)"
                  stroke="rgba(232,163,61,0.4)"
                  strokeWidth="1"
                  strokeDasharray="8 4"
                />
              )}

              {/* Lines between draft points */}
              {draftPoints.map((pt, i) => {
                if (i === 0) return null;
                const prev = draftPoints[i - 1];
                return (
                  <line
                    key={i}
                    x1={prev[0] * 10}
                    y1={prev[1] * 10}
                    x2={pt[0] * 10}
                    y2={pt[1] * 10}
                    stroke="#E8A33D"
                    strokeWidth="2"
                  />
                );
              })}

              {/* Live cursor line */}
              {cursor && (
                <line
                  x1={draftPoints[draftPoints.length - 1][0] * 10}
                  y1={draftPoints[draftPoints.length - 1][1] * 10}
                  x2={cursor[0] * 10}
                  y2={cursor[1] * 10}
                  stroke="#E8A33D"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                  opacity="0.7"
                />
              )}

              {/* Vertex dots */}
              {draftPoints.map((pt, i) => {
                const isFirst = i === 0;
                return (
                  <circle
                    key={i}
                    cx={pt[0] * 10}
                    cy={pt[1] * 10}
                    r={isFirst ? "12" : "6"}
                    fill={isFirst ? "rgba(232,163,61,0.4)" : "#E8A33D"}
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}
            </g>
          )}
        </svg>

        {/* Drawing mode hint */}
        {mode === "draw" && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/60 px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur-sm sm:px-4 sm:text-xs">
            {draftPoints.length < 3
              ? `Click to place points — ${draftPoints.length} placed`
              : "Double-click or click the first point to close"}
          </div>
        )}
      </div>
    </>
  );
}