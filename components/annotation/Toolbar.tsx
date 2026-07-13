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
    <div className="flex flex-row gap-2 overflow-x-auto rounded-2xl border border-[#DCE3D7] bg-white p-3 sm:flex-col sm:overflow-visible">
      <p className="mb-1 hidden font-mono text-xs font-semibold uppercase tracking-widest text-[#8A9389] sm:block">
        Tools
      </p>

      {/* Select tool */}
      <button
        onClick={() => setMode("select")}
        title="Select / Pan"
        className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
          mode === "select"
            ? "bg-[#1F6F4A] text-white shadow-sm"
            : "text-[#5C6B62] hover:bg-[#F7F8F3]"
        }`}
      >
        <MousePointer2 size={17} />
        <span className="hidden sm:inline">Select</span>
      </button>

      {/* Draw polygon tool */}
      <button
        onClick={() => setMode("draw")}
        title="Draw Polygon"
        className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
          mode === "draw"
            ? "bg-[#E8A33D] text-white shadow-sm"
            : "text-[#5C6B62] hover:bg-[#F7F8F3]"
        }`}
      >
        <Pencil size={17} />
        <span className="hidden sm:inline">Draw Polygon</span>
      </button>

      {/* Undo last point (only active while drawing) */}
      <button
        onClick={removeDraftPoint}
        title="Undo Last Point"
        disabled={draftPoints.length === 0}
        className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[#5C6B62] hover:bg-[#F7F8F3] disabled:opacity-40"
      >
        <Undo2 size={17} />
        <span className="hidden sm:inline">Undo Point</span>
      </button>

      <div className="my-1 hidden border-t border-[#DCE3D7] sm:block" />

      {/* Upload new image */}
      <label className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[#5C6B62] hover:bg-[#F7F8F3]">
        <Upload size={17} />
        <span className="hidden sm:inline">Upload Image</span>
        <input type="file" accept=".png,.jpg,.jpeg" onChange={handleUpload} hidden />
      </label>
    </div>
  );
}