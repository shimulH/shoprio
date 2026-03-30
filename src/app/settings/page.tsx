import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireAuth } from "@/lib/auth";

export default async function SettingsPage() {
  await requireAuth();

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Store Settings</h2>
          <p className="text-sm text-slate-500">Configure basic storefront settings and operations.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">General</h3>
            <p className="mt-2 text-sm text-slate-600">Store name: sagactlab flagship</p>
            <p className="text-sm text-slate-600">Currency: USD</p>
            <p className="text-sm text-slate-600">Timezone: GMT+6</p>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-slate-900">Checkout</h3>
            <p className="mt-2 text-sm text-slate-600">Automatic tax calculation: Enabled</p>
            <p className="text-sm text-slate-600">Guest checkout: Enabled</p>
            <p className="text-sm text-slate-600">Order confirmation email: Enabled</p>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
