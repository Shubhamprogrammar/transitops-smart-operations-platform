import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
      <h2 className="text-4xl font-bold text-white">404</h2>
      <p className="mt-2 text-sm text-[#9ca3af]">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 rounded-md bg-[#b45309] px-4 py-2 text-sm font-semibold text-white hover:bg-[#92400e]"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
