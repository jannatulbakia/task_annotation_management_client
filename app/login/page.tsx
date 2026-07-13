"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/loginSchema";
import { login } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const loginStore = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      loginStore(response.access, response.refresh);
      router.push("/dashboard");
    } catch (error) {
      alert("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#F7F8F3] text-[#16241D] antialiased lg:grid-cols-2">
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

      {/* Brand rail — hidden on mobile */}
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-[#DCE3D7] bg-white p-10 lg:flex">
        <div className="pointer-events-none absolute -left-16 top-1/4 h-72 w-72 rounded-full bg-[#1F6F4A]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-[#2A8C7A]/10 blur-3xl" />

        <div className="relative flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 3c4 2 7 5 7 9.5A7 7 0 015 12.5C5 8 8 5 12 3z" fill="#1F6F4A" />
            <path d="M12 3v18" stroke="#FFFFFF" strokeWidth="1.2" />
          </svg>
          <span className="font-display text-lg font-bold tracking-tight">
            Kanvas
          </span>
        </div>

        <div className="relative max-w-sm">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5C6B62]">
            welcome back
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight">
            Your board and your{" "}
            <span className="text-[#2A8C7A]">canvas</span>, right where you
            left them.
          </h2>
        </div>

        <p className="relative font-mono text-[11px] text-[#8A9389]">
          backend: django rest · db: sqlite
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 3c4 2 7 5 7 9.5A7 7 0 015 12.5C5 8 8 5 12 3z" fill="#1F6F4A" />
            </svg>
            <span className="font-display text-lg font-bold tracking-tight">
              Kanvas
            </span>
          </div>

          <h1 className="font-display text-2xl font-bold tracking-tight">
            Log in
          </h1>
          <p className="mt-2 font-body text-sm text-[#5C6B62]">
            Enter your credentials to reach your tasks and annotations.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block font-body text-xs font-medium text-[#5C6B62]">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="w-full rounded-lg border border-[#DCE3D7] bg-white px-3.5 py-2.5 font-body text-sm text-[#16241D] placeholder-[#9CA79E] outline-none transition focus:border-[#1F6F4A] focus:ring-1 focus:ring-[#1F6F4A]"
              />
              {errors.email && (
                <p className="mt-1.5 font-mono text-xs text-[#D64545]">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block font-body text-xs font-medium text-[#5C6B62]">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="w-full rounded-lg border border-[#DCE3D7] bg-white px-3.5 py-2.5 font-body text-sm text-[#16241D] placeholder-[#9CA79E] outline-none transition focus:border-[#1F6F4A] focus:ring-1 focus:ring-[#1F6F4A]"
              />
              {errors.password && (
                <p className="mt-1.5 font-mono text-xs text-[#D64545]">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#1F6F4A] py-2.5 font-body text-sm font-semibold text-white transition hover:bg-[#195c3d] disabled:opacity-50"
            >
              {isSubmitting ? "Logging in…" : "Log in"}
            </button>
          </form>

          <p className="mt-6 font-mono text-xs text-[#8A9389]">
            demo · jack@gmail.com / jack1234
          </p>
        </div>
      </div>
    </div>
  );
}