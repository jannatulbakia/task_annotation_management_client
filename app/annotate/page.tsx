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
        <div>
          {/* Page header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">
              Image Annotation
            </h1>
            <p className="mt-1 text-slate-500">
              Upload radiology images and draw polygon annotations.
            </p>
          </div>

          {/* Main two-column layout */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_220px]">

            {/* Left — Canvas area */}
            <div className="flex flex-col gap-4">
              <AnnotationCanvas />
              <ImageViewer />
            </div>

            {/* Right — Toolbar & polygon list */}
            <div className="flex flex-col gap-4">
              <Toolbar />
              <PolygonList />
            </div>

          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}
