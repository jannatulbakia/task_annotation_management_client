"use client";

import { useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import AnnotationCanvas from "@/components/annotation/AnnotationCanvas";
import Toolbar from "@/components/annotation/Toolbar";
import PolygonList from "@/components/annotation/PolygonList";
import ImageViewer from "@/components/annotation/ImageViewer";
import { getImages } from "@/services/annotation";
import { useAnnotationStore } from "@/store/annotationStore";

export default function AnnotatePage() {
  const setImages = useAnnotationStore((state) => state.setImages);

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
      <AppLayout>
        <div className="mx-auto max-w-6xl">
          {/* Page header */}
          <div className="mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5C6B62]">
              /annotate
            </p>
            <h1 className="mt-1 font-[Manrope,sans-serif] text-2xl font-bold text-[#16241D] sm:text-3xl">
              Image Annotation
            </h1>
            <p className="mt-1 text-sm text-[#5C6B62] sm:text-base">
              Upload radiology images and draw polygon annotations.
            </p>
          </div>

          {/* Main two-column layout */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[1fr_240px]">

            {/* Left — Canvas area */}
            <div className="flex flex-col gap-4">
              <AnnotationCanvas />
              <ImageViewer />
            </div>

            {/* Right — Toolbar & polygon list */}
            <div className="flex flex-col gap-4 xl:order-none">
              <Toolbar />
              <PolygonList />
            </div>

          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}