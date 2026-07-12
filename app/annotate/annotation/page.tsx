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
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Image Annotation
          </h1>

          <p className="mt-2 text-slate-500">
            Upload radiology images and annotate them.
          </p>
        </div>

        <ImageUploader />

        <ImageViewer />
      </div>
    </ProtectedRoute>
  );
}