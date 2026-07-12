import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F7F8F3]">
      <style
        // eslint-disable-next-line react/no-unknown-property
        jsx
        global
      >{`
        @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap");
        body {
          font-family: "Inter", ui-sans-serif, sans-serif;
        }
        .font-mono {
          font-family: "IBM Plex Mono", ui-monospace, monospace;
        }
      `}</style>

      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}