import { create } from "zustand";
import { UploadedImage, Polygon } from "@/types/annotation";
import {
  getImages,
  getPolygons,
  createPolygon as createPolygonService,
  deletePolygon as deletePolygonService,
} from "@/services/annotation";

type DrawingMode = "select" | "draw";

interface AnnotationStore {
  // Images
  images: UploadedImage[];
  currentImage: UploadedImage | null;

  // Polygons for the current image
  polygons: Polygon[];

  // Drawing state
  mode: DrawingMode;
  draftPoints: number[][];   // points being drawn, in percentage coords [x%, y%]

  // Actions
  setImages: (images: UploadedImage[]) => void;
  setCurrentImage: (image: UploadedImage) => Promise<void>;
  addImage: (image: UploadedImage) => void;
  deleteImage: (id: number) => void;

  setMode: (mode: DrawingMode) => void;
  addDraftPoint: (point: number[]) => void;
  removeDraftPoint: () => void;
  clearDraft: () => void;

  savePolygon: (label: string) => Promise<void>;
  removePolygon: (id: number) => Promise<void>;
  refreshPolygons: () => Promise<void>;
}

export const useAnnotationStore = create<AnnotationStore>((set, get) => ({
  images: [],
  currentImage: null,
  polygons: [],
  mode: "select",
  draftPoints: [],

  setImages(images) {
    set({
      images,
      currentImage: images.length > 0 ? images[0] : null,
      polygons: [],
    });
    // Load polygons for first image
    if (images.length > 0) {
      getPolygons(images[0].id).then((polygons) => set({ polygons }));
    }
  },

  async setCurrentImage(image) {
    set({ currentImage: image, draftPoints: [], mode: "select" });
    const polygons = await getPolygons(image.id);
    set({ polygons });
  },

  addImage(image) {
    set((state) => ({
      images: [image, ...state.images],
      currentImage: image,
      polygons: [],
      draftPoints: [],
      mode: "select",
    }));
  },

  deleteImage(id) {
    set((state) => {
      const images = state.images.filter((img) => img.id !== id);
      const currentImage =
        state.currentImage?.id === id
          ? images[0] ?? null
          : state.currentImage;
      return { images, currentImage, polygons: [] };
    });
  },

  setMode(mode) {
    set({ mode, draftPoints: [] });
  },

  addDraftPoint(point) {
    set((state) => ({ draftPoints: [...state.draftPoints, point] }));
  },

  removeDraftPoint() {
    set((state) => ({
      draftPoints: state.draftPoints.slice(0, -1),
    }));
  },

  clearDraft() {
    set({ draftPoints: [] });
  },

  async savePolygon(label) {
    const { currentImage, draftPoints } = get();
    if (!currentImage || draftPoints.length < 3) return;

    const polygon = await createPolygonService({
      image: currentImage.id,
      label,
      points: draftPoints,
    });

    set((state) => ({
      polygons: [...state.polygons, polygon],
      draftPoints: [],
    }));
  },

  async removePolygon(id) {
    await deletePolygonService(id);
    set((state) => ({
      polygons: state.polygons.filter((p) => p.id !== id),
    }));
  },

  async refreshPolygons() {
    const { currentImage } = get();
    if (!currentImage) return;
    const polygons = await getPolygons(currentImage.id);
    set({ polygons });
  },
}));