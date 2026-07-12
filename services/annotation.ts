import api from "./api";
import { UploadedImage, Polygon } from "@/types/annotation";

// ─── Image APIs ───────────────────────────────────────────────────────────────

export const getImages = async (): Promise<UploadedImage[]> => {
  const response = await api.get("/annotation/images/");
  return response.data;
};

export const uploadImage = async (file: File): Promise<UploadedImage> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/annotation/images/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const deleteImage = async (id: number): Promise<void> => {
  await api.delete(`/annotation/images/${id}/`);
};

// ─── Polygon APIs ─────────────────────────────────────────────────────────────

export const getPolygons = async (imageId: number): Promise<Polygon[]> => {
  const response = await api.get("/annotation/polygons/", {
    params: { image: imageId },
  });
  return response.data;
};

export const createPolygon = async (data: {
  image: number;
  label: string;
  points: number[][];
}): Promise<Polygon> => {
  const response = await api.post("/annotation/polygons/", data);
  return response.data;
};

export const deletePolygon = async (id: number): Promise<void> => {
  await api.delete(`/annotation/polygons/${id}/`);
};