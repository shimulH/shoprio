import { CustomerTable } from "@/components/dashboard/customer-table";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { customers } from "@/data/mock-store";
import { requireAuth } from "@/lib/auth";

export default async function CustomersPage() {
  await requireAuth();

  return (
    <DashboardShell>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Customers</h2>
        <p className="text-sm text-slate-500">Review customer profiles and lifetime value at a glance.</p>
        <CustomerTable data={customers} />
      </div>
    </DashboardShell>
  );
}
