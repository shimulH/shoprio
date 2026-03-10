import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { OrdersManagement } from "@/components/dashboard/orders-management";

export default function OrdersPage() {
  return (
    <DashboardShell>
      <OrdersManagement />
    </DashboardShell>
  );
}
