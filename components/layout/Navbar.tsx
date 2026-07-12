"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tasks": "Tasks",
  "/annotate": "Annotation",
};

export default function Navbar() {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-[#DCE3D7] bg-white px-6 py-4">
      <h1 className="font-[Manrope,sans-serif] text-lg font-bold text-[#16241D]">
        {titles[pathname] ?? "Kanvas"}
      </h1>

      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="flex items-center gap-2 rounded-lg border border-[#DCE3D7] px-3.5 py-2 text-sm font-medium text-[#5C6B62] transition hover:border-[#D64545] hover:text-[#D64545]"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 17l5-5-5-5M20 12H9M12 3H6a2 2 0 00-2 2v14a2 2 0 002 2h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Logout
      </button>
    </header>
  );
}