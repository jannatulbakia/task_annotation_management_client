function getApiOrigin(): string {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "";
  return apiBase.replace(/\/api\/?$/, "");
}

function normalizeAbsoluteUrl(path: string): string {
  try {
    const url = new URL(path);
    const origin = getApiOrigin();

    if (
      (url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
      url.pathname.startsWith("/media/")
    ) {
      return `${origin}${url.pathname}${url.search}`;
    }

    if (url.hostname.endsWith(".onrender.com") && url.protocol === "http:") {
      url.protocol = "https:";
      return url.toString();
    }
  } catch {
    return path;
  }

  return path;
}

export function isPublicMediaUrl(path: string): boolean {
  if (!path) return false;

  const resolved = resolveMediaUrl(path);
  return (
    resolved.startsWith("https://res.cloudinary.com/") ||
    resolved.startsWith("http://res.cloudinary.com/")
  );
}

export function resolveMediaUrl(path: string): string {
  if (!path) return "";

  if (path.startsWith("blob:") || path.startsWith("data:")) {
    return path;
  }

  const origin = getApiOrigin();

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return normalizeAbsoluteUrl(path);
  }

  return path.startsWith("/") ? `${origin}${path}` : `${origin}/${path}`;
}

/** Path segment after `/media/` used by the Next.js media proxy route. */
export function getMediaRelativePath(path: string): string {
  if (!path) return "";

  const resolved = resolveMediaUrl(path);

  if (resolved.startsWith("http://") || resolved.startsWith("https://")) {
    try {
      const url = new URL(resolved);
      const mediaPrefix = "/media/";
      if (url.pathname.startsWith(mediaPrefix)) {
        return url.pathname.slice(mediaPrefix.length);
      }
      return url.pathname.replace(/^\//, "");
    } catch {
      return path.replace(/^\/?media\//, "");
    }
  }

  return path.replace(/^\/?media\//, "");
}

export function getProxiedMediaUrl(path: string): string {
  const relativePath = getMediaRelativePath(path);
  if (!relativePath) return "";

  return `/api/media/${relativePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}
