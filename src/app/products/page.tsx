import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { ProductTable } from "@/components/dashboard/product-table";
import { products } from "@/data/mock-store";
import { requireAuth } from "@/lib/auth";

export default async function ProductsPage() {
  await requireAuth();

  return (
    <DashboardShell>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Products</h2>
        <p className="text-sm text-slate-500">Manage catalog, SKU data, and inventory levels.</p>
        <ProductTable data={products} />
      </div>
    </DashboardShell>
  );
}
