import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { kpis } from "@/data/mock-store";

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="space-y-5">
        <h2 className="text-xl font-semibold text-slate-900">Analytics</h2>
        <p className="text-sm text-slate-500">A simple performance snapshot for your storefront.</p>

        <div className="grid gap-4 lg:grid-cols-2">
          {kpis.map((item) => (
            <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</p>
              <div className="mt-4 h-24 rounded-md bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
