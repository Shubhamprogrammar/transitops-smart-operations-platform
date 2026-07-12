"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
      <h2 className="text-2xl font-semibold text-white">Something went wrong</h2>
      <p className="mt-2 text-sm text-[#9ca3af]">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-[#b45309] px-4 py-2 text-sm font-semibold text-white hover:bg-[#92400e]"
      >
        Try again
      </button>
    </div>
  );
}
