"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/fleet", label: "Fleet" },
  { href: "/drivers", label: "Drivers" },
  { href: "/trips", label: "Trips" },
  { href: "/maintenance", label: "Maintenance" },
  { href: "/fuel-expenses", label: "Fuel & Expenses" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-[#262626] bg-[#111827]">
      <div className="flex items-center gap-3 px-6 py-5">
        <div
          className="h-8 w-8 rounded border border-[#6b7280]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #b0b8c4 25%, transparent 25%), linear-gradient(-45deg, #b0b8c4 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #b0b8c4 75%), linear-gradient(-45deg, transparent 75%, #b0b8c4 75%)",
            backgroundSize: "6px 6px",
            backgroundPosition: "0 0, 0 3px, 3px -3px, -3px 0px",
          }}
        />
        <span className="text-lg font-bold text-white">TransitOps</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-[#b45309] text-white"
                  : "text-[#9ca3af] hover:bg-[#1f2937] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
