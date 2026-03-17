import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { kpis } from "@/data/mock-store";

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="space-y-5">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Analytics</h2>
          <p className="text-sm text-slate-500">
            A simple performance snapshot for your storefront.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {kpis.map((item) => (
            <Card key={item.label} className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>{item.label}</CardDescription>
                <CardTitle className="text-2xl">{item.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-24 rounded-md bg-slate-100" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
