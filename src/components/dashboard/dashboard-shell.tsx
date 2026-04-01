import { ReactNode } from "react";
import { getLanguage } from "@/lib/i18n";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

type DashboardShellProps = {
  children: ReactNode;
};

const dashboardCopy = {
  en: {
    sidebar: {
      dashboard: "Dashboard",
      orders: "Orders",
      products: "Products",
      customers: "Customers",
      analytics: "Analytics",
      settings: "Settings",
      title: "Control Center",
      subtitle: "Commerce operations for the whole team.",
    },
    topbar: {
      welcome: "Welcome back",
      title: "sagactlab dashboard",
      searchPlaceholder: "Search orders, products...",
      newProduct: "+ New Product",
      logout: "Log Out",
    },
  },
  bn: {
    sidebar: {
      dashboard: "ড্যাশবোর্ড",
      orders: "অর্ডার",
      products: "পণ্য",
      customers: "কাস্টমার",
      analytics: "অ্যানালিটিক্স",
      settings: "সেটিংস",
      title: "কন্ট্রোল সেন্টার",
      subtitle: "পুরো টিমের জন্য কমার্স অপারেশনস।",
    },
    topbar: {
      welcome: "আবার স্বাগতম",
      title: "sagactlab ড্যাশবোর্ড",
      searchPlaceholder: "অর্ডার, পণ্য খুঁজুন...",
      newProduct: "+ নতুন পণ্য",
      logout: "লগ আউট",
    },
  },
} as const;

export async function DashboardShell({ children }: DashboardShellProps) {
  const language = await getLanguage();
  const copy = dashboardCopy[language];

  return (
    <div className="min-h-screen bg-[#f6f4ec] text-slate-900">
      <div className="flex w-full">
        <Sidebar labels={copy.sidebar} />
        <main className="min-h-screen flex-1">
          <Topbar language={language} labels={copy.topbar} />
          <section className="p-5 lg:p-8">{children}</section>
        </main>
      </div>
    </div>
  );
}
