"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const ROLES = [
  { value: "fleet-manager", label: "Fleet Manager" },
  { value: "dispatcher", label: "Dispatcher" },
  { value: "safety-officer", label: "Safety Officer" },
  { value: "financial-analyst", label: "Financial Analyst" },
];

const ROLE_ACCESS: Record<string, string> = {
  "fleet-manager": "Fleet, Maintenance",
  dispatcher: "Dispatch, Trips",
  "safety-officer": "Safety, Compliance",
  "financial-analyst": "Fuel & Expenses, Analytics",
};

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("dispatcher");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate network delay.
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Demo: type "wrong" as the password to trigger the error state.
    if (password.toLowerCase() === "wrong") {
      setError("Invalid credentials.\nAccount locked after 5 failed attempts.");
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col md:flex-row">
      {/* Left panel */}
      <section className="flex w-full flex-col justify-between bg-[#d9dce1] p-10 text-[#111827] md:w-5/12 md:p-14">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div
              className="h-10 w-10 rounded border border-[#9ca3af]"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #b0b8c4 25%, transparent 25%), linear-gradient(-45deg, #b0b8c4 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #b0b8c4 75%), linear-gradient(-45deg, transparent 75%, #b0b8c4 75%)",
                backgroundSize: "8px 8px",
                backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0px",
              }}
            />
            <div>
              <h1 className="text-xl font-bold leading-tight tracking-tight">
                TransitOps
              </h1>
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#4b5563]">
                Smart Transport Operations Platform
              </p>
            </div>
          </div>
        </div>

        <div className="my-10 md:my-0">
          <h2 className="mb-4 text-lg font-semibold text-[#111827]">
            One login. Four roles:
          </h2>
          <ul className="space-y-2 text-sm font-medium text-[#374151]">
            {ROLES.map((r) => (
              <li key={r.value} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#d97706]" />
                {r.label}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6b7280]">
          TransitOps © 2026 — Heart Rail
        </p>
      </section>

      {/* Right panel */}
      <section className="relative flex w-full flex-col items-center justify-center bg-[#0a0a0a] px-6 py-12 md:w-7/12 md:px-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white">
              Sign in to your account
            </h2>
            <p className="mt-1 text-sm text-[#9ca3af]">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-medium uppercase tracking-wide text-[#9ca3af]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@transitops.com"
                className="w-full rounded-md border border-[#374151] bg-[#111827] px-3 py-2.5 text-sm text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-xs font-medium uppercase tracking-wide text-[#9ca3af]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-[#374151] bg-[#111827] px-3 py-2.5 text-sm text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
                required
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-1 block text-xs font-medium uppercase tracking-wide text-[#9ca3af]"
              >
                Role
              </label>
              <div className="relative">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full appearance-none rounded-md border border-[#374151] bg-[#111827] px-3 py-2.5 text-sm text-white outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                  ▼
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm text-[#d1d5db]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#4b5563] bg-[#111827] text-[#d97706] focus:ring-[#d97706]"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-sm font-medium text-[#d1d5db] underline-offset-2 hover:text-white hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-md bg-[#b45309] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#92400e] focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-60"
            >
              {isLoading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="mt-8 border-t border-[#262626] pt-6">
            <p className="mb-3 text-xs text-[#9ca3af]">
              Access is scoped by role after login:
            </p>
            <ul className="space-y-1.5 text-xs text-[#9ca3af]">
              {ROLES.map((r) => (
                <li key={r.value} className="flex gap-2">
                  <span className="text-[#6b7280]">•</span>
                  <span>
                    <span className="font-medium text-[#d1d5db]">
                      {r.label}
                    </span>{" "}
                    — {ROLE_ACCESS[r.value]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Error state */}
        {error && (
          <div className="absolute right-4 top-4 max-w-xs rounded-lg border border-dashed border-[#ef4444] bg-[#1a0505] px-4 py-3 shadow-lg md:right-8 md:top-8">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#ef4444]">
              Error state
            </p>
            <ul className="space-y-1 text-sm text-[#fca5a5]">
              {error.split("\n").map((line, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 text-xs">✕</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
