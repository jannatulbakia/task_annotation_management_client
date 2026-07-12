"use client";

import { Trash2 } from "lucide-react";
import { useAnnotationStore } from "@/store/annotationStore";
import { deleteImage } from "@/services/annotation";

export default function ImageViewer() {
  const { images, currentImage, setCurrentImage, deleteImage: removeImageFromStore } =
    useAnnotationStore();

  const handleDelete = async (
    e: React.MouseEvent,
    id: number
  ) => {
    e.stopPropagation();
    try {
      await deleteImage(id);
      removeImageFromStore(id);
    } catch {
      alert("Failed to delete image.");
    }
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Images ({images.length})
      </p>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img) => {
          const isActive = currentImage?.id === img.id;

          return (
            <div
              key={img.id}
              onClick={() => setCurrentImage(img)}
              className={`group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                isActive
                  ? "border-blue-500 shadow-lg shadow-blue-100"
                  : "border-transparent hover:border-slate-300"
              }`}
            >
              <img
                src={img.image}
                alt="Thumbnail"
                className="h-20 w-28 object-cover"
              />

              {/* Delete button */}
              <button
                onClick={(e) => handleDelete(e, img.id)}
                className="absolute right-1 top-1 hidden rounded-full bg-black/60 p-1 text-white transition hover:bg-red-600 group-hover:flex"
                title="Delete image"
              >
                <Trash2 size={12} />
              </button>

              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 bg-blue-600 py-0.5 text-center text-xs font-bold text-white">
                  Active
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}