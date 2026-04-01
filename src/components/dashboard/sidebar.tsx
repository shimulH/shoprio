"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  labels: {
    dashboard: string;
    orders: string;
    products: string;
    customers: string;
    analytics: string;
    settings: string;
    title: string;
    subtitle: string;
  };
};

export function Sidebar({ labels }: SidebarProps) {
  const pathname = usePathname();
  const navItems = [
    { href: "/dashboard", label: labels.dashboard },
    { href: "/orders", label: labels.orders },
    { href: "/products", label: labels.products },
    { href: "/customers", label: labels.customers },
    { href: "/analytics", label: labels.analytics },
    { href: "/settings", label: labels.settings },
  ];

  return (
    <aside className="hidden w-64 border-r border-[#dce4db] bg-[#fffdf8] px-5 py-6 lg:block">
      <p className="text-xs font-semibold tracking-[0.2em] text-[#6f7f75]">SAGACTLAB</p>
      <h1 className="mt-2 font-display text-2xl text-[#10261d]">{labels.title}</h1>
      <p className="mt-2 text-sm leading-6 text-[#66786e]">{labels.subtitle}</p>

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
