import Link from "next/link";

const links = [
  {
    href: "/tasks",
    label: "Task board",
    description:
      "Manage your day by day kanban board; add, edit, and drag tasks between To Do, In Progress, and Done.",
    accent: "#1F6F4A",
    accentTint: "#E7F1EA",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="5" height="16" rx="1.5" stroke="#1F6F4A" strokeWidth="1.7" />
        <rect x="9.5" y="4" width="5" height="10" rx="1.5" stroke="#1F6F4A" strokeWidth="1.7" />
        <rect x="16" y="4" width="5" height="13" rx="1.5" stroke="#1F6F4A" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    href: "/annotate",
    label: "Annotation tool",
    description:
      "Upload images, draw polygons, and manage annotations; everything saved straight to your workspace.",
    accent: "#2A8C7A",
    accentTint: "#E4F3EF",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#2A8C7A" strokeWidth="1.7" />
        <path
          d="M7 15l3.5-6 3 4.5L16 10l1.5 3.5"
          stroke="#2A8C7A"
          strokeWidth="1.7"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5C6B62]">
        welcome back
      </p>
      <h1 className="mt-2 font-[Manrope,sans-serif] text-3xl font-bold tracking-tight text-[#16241D]">
        Your workspace
      </h1>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#5C6B62]">
        Everything you're planning and everything you're marking up, in one
        place. Pick up where you left off.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border border-[#DCE3D7] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ backgroundColor: item.accentTint }}
            >
              {item.icon}
            </div>
            <h2 className="font-[Manrope,sans-serif] text-lg font-bold text-[#16241D]">
              {item.label}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-[#5C6B62]">
              {item.description}
            </p>
            <span
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition group-hover:gap-2.5"
              style={{ color: item.accent }}
            >
              Open
              <span>→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}