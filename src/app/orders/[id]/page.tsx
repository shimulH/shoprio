"use client";

import { useParams } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { OrderDetailsWorkspace } from "@/components/dashboard/order-details-workspace";

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const orderId = decodeURIComponent(params.id ?? "");

  return (
    <DashboardShell>
      <OrderDetailsWorkspace key={orderId} orderId={orderId} />
    </DashboardShell>
  );
}
