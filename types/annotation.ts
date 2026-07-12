export interface UploadedImage {
  id: number;
  image: string;
  uploaded_at: string;
  polygons?: Polygon[];
}

export interface Polygon {
  id: number;
  image: number;
  label: string;
  points: number[][];
  created_at: string;
}