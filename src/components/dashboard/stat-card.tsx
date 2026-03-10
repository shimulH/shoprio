import { KPI } from "@/types/dashboard";

type StatCardProps = {
  item: KPI;
};

export function StatCard({ item }: StatCardProps) {
  const trendClass =
    item.trend === "up"
      ? "text-emerald-600"
      : item.trend === "down"
        ? "text-rose-600"
        : "text-slate-500";

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{item.label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{item.value}</p>
      <p className={`mt-2 text-sm font-medium ${trendClass}`}>{item.change} vs last month</p>
    </article>
  );
}
