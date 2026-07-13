"use client";

import { useEffect } from "react";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import ImageUploader from "@/components/annotation/ImageUploader";

import ImageViewer from "@/components/annotation/ImageViewer";

import { getImages } from "@/services/annotation";

import { useAnnotationStore } from "@/store/annotationStore";

export default function AnnotationPage() {
  const setImages = useAnnotationStore(
    (state) => state.setImages
  );

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await getImages();
        setImages(images);
      } catch (error) {
        console.error(error);
      }
    };

    loadImages();
  }, [setImages]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen space-y-8 bg-[#F7F8F3] p-6 sm:p-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5C6B62]">
            /annotate/annotation
          </p>
          <h1 className="mt-1 font-[Manrope,sans-serif] text-2xl font-bold text-[#16241D] sm:text-3xl">
            Image Annotation
          </h1>

          <p className="mt-2 text-sm text-[#5C6B62] sm:text-base">
            Upload radiology images and annotate them.
          </p>
        </div>

        <ImageUploader />

        <ImageViewer />
      </div>
    </ProtectedRoute>
  );
}