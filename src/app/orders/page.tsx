import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { OrdersManagement } from "@/components/dashboard/orders-management";
import { requireAuth } from "@/lib/auth";

export default async function OrdersPage() {
  await requireAuth();

  return (
    <DashboardShell>
      <OrdersManagement />
    </DashboardShell>
  );
}
