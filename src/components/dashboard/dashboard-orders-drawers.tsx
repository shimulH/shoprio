"use client";

import { useState } from "react";
import { OrderDetailsWorkspace } from "@/components/dashboard/order-details-workspace";
import { OrdersManagement } from "@/components/dashboard/orders-management";

export function DashboardOrdersDrawers() {
  const [openOrdersDrawer, setOpenOrdersDrawer] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  function closeAll() {
    setOpenOrdersDrawer(false);
    setSelectedOrderId(null);
  }

  return (
    <>
      <button
        onClick={() => setOpenOrdersDrawer(true)}
        className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Open Orders Workspace
      </button>

      {openOrdersDrawer && (
        <div className="fixed inset-0 z-40">
          <button
            aria-label="Close orders workspace drawers"
            onClick={closeAll}
            className="absolute inset-0 bg-black/20"
          />

          <aside className="absolute right-0 top-0 h-full w-full max-w-3xl overflow-y-auto border-l border-slate-200 bg-slate-50 p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Orders Workspace</h3>
              <button
                onClick={closeAll}
                className="rounded-md border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            <OrdersManagement
              openInPlaceDrawer={false}
              onOpenOrder={(orderId) => setSelectedOrderId(orderId)}
              stickyTotalColumn
            />
          </aside>

          {selectedOrderId && (
            <aside className="absolute right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto border-l border-slate-200 bg-slate-50 p-5 shadow-2xl">
              <OrderDetailsWorkspace
                orderId={selectedOrderId}
                mode="drawer"
                onClose={() => setSelectedOrderId(null)}
              />
            </aside>
          )}
        </div>
      )}
    </>
  );
}
