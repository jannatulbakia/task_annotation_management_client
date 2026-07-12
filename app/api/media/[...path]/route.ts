import { NextRequest, NextResponse } from "next/server";

function getApiOrigin(): string {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "";
  return apiBase.replace(/\/api\/?$/, "");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const mediaPath = path.map((segment) => decodeURIComponent(segment)).join("/");
  const url = `${getApiOrigin()}/media/${mediaPath}`;

  const authorization = request.headers.get("authorization");

  try {
    const response = await fetch(url, {
      headers: authorization ? { Authorization: authorization } : {},
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Image not found on server" },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();
    const contentType =
      response.headers.get("content-type") ?? "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch image from server" },
      { status: 502 }
    );
  }
}
