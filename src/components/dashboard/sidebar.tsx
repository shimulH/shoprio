"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/orders", label: "Orders" },
  { href: "/products", label: "Products" },
  { href: "/customers", label: "Customers" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r border-[#dce4db] bg-[#fffdf8] px-5 py-6 lg:block">
      <p className="text-xs font-semibold tracking-[0.2em] text-[#6f7f75]">SAGACTLAB</p>
      <h1 className="mt-2 [font-family:var(--font-fraunces)] text-2xl text-[#10261d]">Control Center</h1>
      <p className="mt-2 text-sm leading-6 text-[#66786e]">Commerce operations for the whole team.</p>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => {
          const active =
            item.href === "/dashboard" ? pathname === "/dashboard" : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                active
                  ? "bg-[#10261d] text-white"
                  : "text-[#5f7167] hover:bg-[#eef3eb] hover:text-[#10261d]"
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
