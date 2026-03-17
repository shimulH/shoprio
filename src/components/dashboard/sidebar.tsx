"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/orders", label: "Orders" },
  { href: "/products", label: "Products" },
  { href: "/customers", label: "Customers" },
  { href: "/analytics", label: "Analytics" },
  { href: "/settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden sticky top-0 h-screen w-64 border-r border-slate-200 bg-white px-5 py-6 lg:block">
      <p className="text-xs font-semibold tracking-[0.2em] text-slate-500">
        STOREFRONT
      </p>
      <h1 className="mt-2 text-xl font-semibold text-slate-900">
        Admin Dashboard
      </h1>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Button
              key={item.href}
              variant="list"
              asChild
              className={
                active ? "bg-slate-100 text-slate-900 font-semibold" : ""
              }
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
