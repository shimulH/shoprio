import { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#f6f4ec] text-slate-900">
      <div className="flex w-full">
        <Sidebar />
        <main className="min-h-screen flex-1">
          <Topbar />
          <section className="p-5 lg:p-8">{children}</section>
        </main>
      </div>
    </div>
  );
}
