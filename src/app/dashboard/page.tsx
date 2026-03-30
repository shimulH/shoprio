import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardOrdersDrawers } from "@/components/dashboard/dashboard-orders-drawers";
import { OrderTable } from "@/components/dashboard/order-table";
import { ProductTable } from "@/components/dashboard/product-table";
import { StatCard } from "@/components/dashboard/stat-card";
import { kpis, orders, products } from "@/data/mock-store";
import { requireAuth } from "@/lib/auth";

export default async function DashboardPage() {
  await requireAuth();

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <DashboardOrdersDrawers />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <StatCard key={item.label} item={item} />
          ))}
        </div>

        <OrderTable data={orders} />
        <ProductTable data={products} />
      </div>
    </DashboardShell>
  );
}
