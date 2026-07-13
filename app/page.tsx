"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

type ApiStatus = "checking" | "connected" | "offline";

export default function Home() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>("checking");

  useEffect(() => {
    api
      .get("/tasks/")
      .then(() => setApiStatus("connected"))
      .catch(() => setApiStatus("offline"));
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8F3] text-[#16241D] antialiased">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap");
        .font-display {
          font-family: "Manrope", ui-sans-serif, sans-serif;
        }
        .font-body {
          font-family: "Inter", ui-sans-serif, sans-serif;
        }
        .font-mono {
          font-family: "IBM Plex Mono", ui-monospace, monospace;
        }
      `}</style>

      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 font-body">
        <div className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 3c4 2 7 5 7 9.5A7 7 0 015 12.5C5 8 8 5 12 3z" fill="#1F6F4A" />
            <path d="M12 3v18" stroke="#F7F8F3" strokeWidth="1.2" />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight">
            Kanvas
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-2 rounded-full border border-[#DCE3D7] bg-white px-3 py-1.5 font-mono text-xs sm:flex">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                apiStatus === "connected"
                  ? "bg-[#1F6F4A]"
                  : apiStatus === "offline"
                  ? "bg-[#D64545]"
                  : "animate-pulse bg-[#9CA79E]"
              }`}
            />
            <span className="text-[#5C6B62]">
              {apiStatus === "connected"
                ? "api online"
                : apiStatus === "offline"
                ? "api offline"
                : "checking api…"}
            </span>
          </div>

          <Link
            href="/login"
            className="rounded-lg bg-[#1F6F4A] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#195c3d]"
          >
            Enter workspace
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-12 lg:grid-cols-2 lg:pt-20">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5C6B62]">
            tasks <span className="text-[#1F6F4A]">×</span> annotation
          </p>

          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
            Plan the{" "}
            <span className="relative">
              work
              <span className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-[#1F6F4A]" />
            </span>
            .
            <br />
            Mark the{" "}
            <span className="relative">
              pixels
              <span className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-[#2A8C7A]" />
            </span>
            .
          </h1>

          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-[#5C6B62]">
            One workspace to run your kanban board day by day, and annotate
            images with precision polygons — everything synced straight to a
            Django backend.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#1F6F4A] px-5 py-3 font-body text-sm font-semibold text-white transition hover:bg-[#195c3d]"
            >
              Enter workspace
              <span className="transition group-hover:translate-x-0.5">→</span>
            </Link>
            <span className="font-mono text-xs text-[#8A9389]">
              demo: jack@gmail.com
            </span>
          </div>
        </div>

        {/* Signature visual: kanban card + annotation overlay */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-[#1F6F4A]/10 via-transparent to-[#2A8C7A]/10 blur-2xl" />

          {/* Kanban mini board */}
          <div className="relative rounded-2xl border border-[#DCE3D7] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#8A9389]">
              <span>/tasks</span>
              <span className="rounded-full bg-[#E7F1EA] px-2 py-0.5 text-[#1F6F4A]">
                today
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["To Do", "In Progress", "Done"].map((col, i) => (
                <div key={col} className="rounded-lg bg-[#F7F8F3] p-2">
                  <p className="mb-2 font-mono text-[9px] uppercase text-[#8A9389]">
                    {col}
                  </p>
                  <div
                    className={`rounded-md border border-[#DCE3D7] bg-white p-2 ${
                      i === 1 ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    <div className="mb-1.5 h-1.5 w-3/4 rounded-full bg-[#1F6F4A]/50" />
                    <div className="h-1.5 w-1/2 rounded-full bg-[#DCE3D7]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Annotation card, overlapping */}
          <div className="relative -mt-8 ml-10 rounded-2xl border border-[#DCE3D7] bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#8A9389]">
              <span>/annotate</span>
              <span className="rounded-full bg-[#E4F3EF] px-2 py-0.5 text-[#2A8C7A]">
                polygon
              </span>
            </div>
            <div className="relative h-28 overflow-hidden rounded-lg bg-[#F7F8F3]">
              <svg viewBox="0 0 200 100" className="h-full w-full">
                <polygon
                  points="40,70 70,25 130,20 165,60 120,85"
                  fill="#2A8C7A1A"
                  stroke="#2A8C7A"
                  strokeWidth="1.5"
                />
                {[
                  [40, 70],
                  [70, 25],
                  [130, 20],
                  [165, 60],
                  [120, 85],
                ].map(([x, y], idx) => (
                  <circle key={idx} cx={x} cy={y} r="2.5" fill="#2A8C7A" />
                ))}
              </svg>
              <span className="absolute bottom-1.5 right-2 font-mono text-[9px] text-[#2A8C7A]/80">
                x:120 y:85
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}