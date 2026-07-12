"use client";

import { MousePointer2, Pencil, Undo2, Upload } from "lucide-react";
import { useAnnotationStore } from "@/store/annotationStore";
import { uploadImage } from "@/services/annotation";
import { ChangeEvent } from "react";

export default function Toolbar() {
  const { mode, setMode, removeDraftPoint, draftPoints, addImage } =
    useAnnotationStore();

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    try {
      const image = await uploadImage(e.target.files[0]);
      addImage(image);
    } catch {
      alert("Upload failed.");
    }
    // reset input so same file can be re-uploaded
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Tools
      </p>

      {/* Select tool */}
      <button
        onClick={() => setMode("select")}
        title="Select / Pan"
        className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
          mode === "select"
            ? "bg-blue-600 text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        <MousePointer2 size={17} />
        Select
      </button>

      {/* Draw polygon tool */}
      <button
        onClick={() => setMode("draw")}
        title="Draw Polygon"
        className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
          mode === "draw"
            ? "bg-yellow-500 text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        <Pencil size={17} />
        Draw Polygon
      </button>

      {/* Undo last point (only active while drawing) */}
      <button
        onClick={removeDraftPoint}
        title="Undo Last Point"
        disabled={draftPoints.length === 0}
        className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40"
      >
        <Undo2 size={17} />
        Undo Point
      </button>

      <div className="my-1 border-t border-slate-100" />

      {/* Upload new image */}
      <label className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">
        <Upload size={17} />
        Upload Image
        <input type="file" accept=".png,.jpg,.jpeg" onChange={handleUpload} hidden />
      </label>
    </div>
  );
}
