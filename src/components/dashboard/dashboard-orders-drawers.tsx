"use client";

import { useState } from "react";
import { OrderDetailsWorkspace } from "@/components/dashboard/order-details-workspace";
import { OrdersManagement } from "@/components/dashboard/orders-management";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function DashboardOrdersDrawers() {
  const [openOrdersDrawer, setOpenOrdersDrawer] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  return (
    <>
      <Button onClick={() => setOpenOrdersDrawer(true)}>
        Open Orders Workspace
      </Button>

      <Sheet
        open={openOrdersDrawer}
        onOpenChange={(open) => {
          if (!open) {
            setOpenOrdersDrawer(false);
            setSelectedOrderId(null);
          } else {
            setOpenOrdersDrawer(true);
          }
        }}
      >
        <SheetContent
          side="right"
          className="w-full max-w-3xl overflow-y-auto bg-slate-50 p-5"
          showCloseButton={false}
        >
          <SheetHeader className="mb-4 flex-row items-center justify-between p-0">
            <SheetTitle>Orders Workspace</SheetTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setOpenOrdersDrawer(false);
                setSelectedOrderId(null);
              }}
            >
              Close
            </Button>
          </SheetHeader>

          <OrdersManagement
            openInPlaceDrawer={false}
            onOpenOrder={(orderId) => setSelectedOrderId(orderId)}
            stickyTotalColumn
          />
        </SheetContent>
      </Sheet>

      <Sheet
        open={!!selectedOrderId}
        onOpenChange={(open) => {
          if (!open) setSelectedOrderId(null);
        }}
      >
        <SheetContent
          side="right"
          className="z-60 w-full max-w-2xl overflow-y-auto bg-slate-50 p-5"
        >
          {selectedOrderId && (
            <OrderDetailsWorkspace
              orderId={selectedOrderId}
              mode="drawer"
              onClose={() => setSelectedOrderId(null)}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
