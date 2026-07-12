"use client";

import { useEffect, useState } from "react";
import { getAccessToken } from "@/services/auth";
import { getImageFileUrl } from "@/services/annotation";
import {
  getMediaRelativePath,
  getProxiedMediaUrl,
  isPublicMediaUrl,
  resolveMediaUrl,
} from "@/utils/media";

interface AuthenticatedImageProps {
  src: string;
  imageId?: number;
  alt: string;
  className?: string;
  draggable?: boolean;
}

async function fetchImageBlob(url: string): Promise<Blob> {
  const token = getAccessToken();
  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Image request failed (${response.status})`);
  }

  return response.blob();
}

export default function AuthenticatedImage({
  src,
  imageId,
  alt,
  className,
  draggable,
}: AuthenticatedImageProps) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let blobUrl: string | null = null;

    const load = async () => {
      setFailed(false);
      setObjectUrl(null);

      if (!src && !imageId) {
        setFailed(true);
        return;
      }

      if (src && isPublicMediaUrl(src)) {
        if (!cancelled) setObjectUrl(resolveMediaUrl(src));
        return;
      }

      const candidates = [
        imageId ? getImageFileUrl(imageId) : "",
        getProxiedMediaUrl(src),
        resolveMediaUrl(src),
      ].filter(Boolean);

      const uniqueCandidates = [...new Set(candidates)];

      for (const url of uniqueCandidates) {
        try {
          const blob = await fetchImageBlob(url);
          if (cancelled) return;
          blobUrl = URL.createObjectURL(blob);
          setObjectUrl(blobUrl);
          return;
        } catch {
          // Try the next loading strategy.
        }
      }

      if (!cancelled) {
        console.error("Failed to load image:", imageId ?? getMediaRelativePath(src));
        setFailed(true);
      }
    };

    void load();

    return () => {
      cancelled = true;
      if (blobUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [src, imageId]);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1 bg-slate-800 px-2 text-center text-slate-500 ${className ?? ""}`}
        aria-label={alt}
      >
        <span className="text-xs">Unavailable</span>
        <span className="text-[10px] leading-tight">
          File missing on server — re-upload the image
        </span>
      </div>
    );
  }

  if (!objectUrl) {
    return (
      <div
        className={`animate-pulse bg-slate-800 ${className ?? ""}`}
        aria-hidden
      />
    );
  }

  return (
    <img
      src={objectUrl}
      alt={alt}
      className={className}
      draggable={draggable}
    />
  );
}
