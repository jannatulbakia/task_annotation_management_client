"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={active ? "#1F6F4A" : "#5C6B62"} strokeWidth="1.7" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={active ? "#1F6F4A" : "#5C6B62"} strokeWidth="1.7" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={active ? "#1F6F4A" : "#5C6B62"} strokeWidth="1.7" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={active ? "#1F6F4A" : "#5C6B62"} strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    href: "/tasks",
    label: "Tasks",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="5" height="16" rx="1.5" stroke={active ? "#1F6F4A" : "#5C6B62"} strokeWidth="1.7" />
        <rect x="9.5" y="4" width="5" height="10" rx="1.5" stroke={active ? "#1F6F4A" : "#5C6B62"} strokeWidth="1.7" />
        <rect x="16" y="4" width="5" height="13" rx="1.5" stroke={active ? "#1F6F4A" : "#5C6B62"} strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    href: "/annotate",
    label: "Annotation",
    icon: (active: boolean) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke={active ? "#2A8C7A" : "#5C6B62"} strokeWidth="1.7" />
        <path
          d="M7 15l3.5-6 3 4.5L16 10l1.5 3.5"
          stroke={active ? "#2A8C7A" : "#5C6B62"}
          strokeWidth="1.7"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-[#DCE3D7] bg-white p-5 font-[Inter,sans-serif]">
      <div className="mb-8 flex items-center gap-2 px-2">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3c4 2 7 5 7 9.5A7 7 0 015 12.5C5 8 8 5 12 3z"
            fill="#1F6F4A"
          />
          <path d="M12 3v18" stroke="#F7F8F3" strokeWidth="1.2" />
        </svg>
        <span className="font-[Manrope,sans-serif] text-lg font-bold tracking-tight text-[#16241D]">
          Kanvas
        </span>
      </div>

      <nav className="space-y-1.5">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[#E7F1EA] text-[#1F6F4A]"
                  : "text-[#5C6B62] hover:bg-[#F7F8F3] hover:text-[#16241D]"
              }`}
            >
              {link.icon(active)}
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-[#DCE3D7] bg-[#F7F8F3] p-3">
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#5C6B62]">
          signed in as
        </p>
        <p className="mt-1 truncate text-sm font-medium text-[#16241D]">
          john@gmail.com
        </p>
      </div>
    </aside>
  );
}