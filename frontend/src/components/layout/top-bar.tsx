"use client";

import { useRouter } from "next/navigation";

export function TopBar() {
  const router = useRouter();

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#262626] bg-[#0a0a0a] px-6">
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-md border border-[#374151] bg-[#111827] px-3 py-1.5 text-sm text-white placeholder-[#6b7280] outline-none ring-[#d97706] transition focus:border-[#d97706] focus:ring-1"
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-white">Ravija K.</span>
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#1f2937] px-2.5 py-1 text-xs font-medium text-[#d1d5db]">
            Dispatcher
          </span>
          <button
            onClick={() => router.push("/")}
            className="rounded-full bg-[#374151] p-1.5 text-xs text-white hover:bg-[#4b5563]"
            title="Sign out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19 10a.75.75 0 01-.75.75h-7.612l1.432 1.433a.75.75 0 11-1.06 1.06l-2.5-2.5a.75.75 0 010-1.06l2.5-2.5a.75.75 0 111.06 1.06l-1.432 1.433h7.612A.75.75 0 0119 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
