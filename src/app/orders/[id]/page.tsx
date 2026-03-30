import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { OrderDetailsWorkspace } from "@/components/dashboard/order-details-workspace";
import { requireAuth } from "@/lib/auth";

type OrderDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  await requireAuth();
  const resolvedParams = await params;
  const orderId = decodeURIComponent(resolvedParams.id ?? "");

  return (
    <DashboardShell>
      <OrderDetailsWorkspace key={orderId} orderId={orderId} />
    </DashboardShell>
  );
}
