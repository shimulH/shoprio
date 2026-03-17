import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Store Settings
          </h2>
          <p className="text-sm text-slate-500">
            Configure basic storefront settings and operations.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">General</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-slate-600">
                Store name: Shimul Storefront
              </p>
              <p className="text-sm text-slate-600">Currency: USD</p>
              <p className="text-sm text-slate-600">Timezone: GMT+6</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Checkout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm text-slate-600">
                Automatic tax calculation: Enabled
              </p>
              <p className="text-sm text-slate-600">Guest checkout: Enabled</p>
              <p className="text-sm text-slate-600">
                Order confirmation email: Enabled
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
