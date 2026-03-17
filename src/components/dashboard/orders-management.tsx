"use client";

import { useMemo, useState } from "react";
import { OrderDetailsWorkspace } from "@/components/dashboard/order-details-workspace";
import { orders } from "@/data/mock-store";
import { FinancialStatus, FulfillmentStatus, Order } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/app-table";

const financialFilters: Array<"All" | FinancialStatus> = [
  "All",
  "Pending",
  "Authorized",
  "Partially Paid",
  "Paid",
  "Partially Refunded",
  "Refunded",
  "Voided",
];
const fulfillmentFilters: Array<"All" | FulfillmentStatus> = [
  "All",
  "Unfulfilled",
  "In Progress",
  "Partially Fulfilled",
  "Fulfilled",
  "Restocked",
];
const orderFilters = ["All", "Open", "Archived", "Canceled"] as const;

type OrderFilter = (typeof orderFilters)[number];
type OrdersManagementProps = {
  openInPlaceDrawer?: boolean;
  onOpenOrder?: (orderId: string) => void;
  stickyTotalColumn?: boolean;
};

function getDisplayStatus(order: Order): "Open" | "Archived" | "Canceled" {
  if (order.cancelledAt) return "Canceled";
  if (order.archived) return "Archived";
  return "Open";
}

function badgeClass(status: string) {
  if (status === "Paid" || status === "Fulfilled" || status === "Delivered") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (status === "Pending" || status === "Unfulfilled" || status === "Open") {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  if (
    status === "Authorized" ||
    status === "In Progress" ||
    status === "Partially Fulfilled" ||
    status === "Shipped"
  ) {
    return "bg-sky-100 text-sky-700 border-sky-200";
  }

  if (
    status === "Refunded" ||
    status === "Partially Refunded" ||
    status === "Voided" ||
    status === "Canceled"
  ) {
    return "bg-rose-100 text-rose-700 border-rose-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

function getSummary(data: Order[]) {
  return {
    total: data.length,
    open: data.filter((order) => getDisplayStatus(order) === "Open").length,
    pendingPayment: data.filter(
      (order) =>
        order.financialStatus === "Pending" ||
        order.financialStatus === "Authorized",
    ).length,
    unfulfilled: data.filter(
      (order) => order.fulfillmentStatus === "Unfulfilled",
    ).length,
    archived: data.filter((order) => order.archived).length,
  };
}

export function OrdersManagement({
  openInPlaceDrawer = true,
  onOpenOrder,
  stickyTotalColumn = false,
}: OrdersManagementProps) {
  const [ordersData] = useState<Order[]>(orders);
  const [query, setQuery] = useState("");
  const [financialFilter, setFinancialFilter] = useState<
    "All" | FinancialStatus
  >("All");
  const [fulfillmentFilter, setFulfillmentFilter] = useState<
    "All" | FulfillmentStatus
  >("All");
  const [orderFilter, setOrderFilter] = useState<OrderFilter>("All");
  const [drawerOrderId, setDrawerOrderId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    const lowered = query.trim().toLowerCase();

    return ordersData.filter((order) => {
      const matchesSearch =
        lowered.length === 0 ||
        order.id.toLowerCase().includes(lowered) ||
        order.customer.toLowerCase().includes(lowered) ||
        order.email.toLowerCase().includes(lowered);

      const matchesFinancial =
        financialFilter === "All" || order.financialStatus === financialFilter;
      const matchesFulfillment =
        fulfillmentFilter === "All" ||
        order.fulfillmentStatus === fulfillmentFilter;
      const displayStatus = getDisplayStatus(order);
      const matchesOrder =
        orderFilter === "All" || displayStatus === orderFilter;

      return (
        matchesSearch && matchesFinancial && matchesFulfillment && matchesOrder
      );
    });
  }, [financialFilter, fulfillmentFilter, orderFilter, ordersData, query]);

  const summary = getSummary(filteredOrders);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Orders</h2>
        <p className="text-sm text-slate-500">
          Orders list view. Click any row to open full details.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card className="bg-white p-4 shadow-sm">
          <CardContent className="p-0">
            <p className="text-sm text-slate-500">Total Orders</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {summary.total}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white p-4 shadow-sm">
          <CardContent className="p-0">
            <p className="text-sm text-slate-500">Open Orders</p>
            <p className="mt-1 text-2xl font-semibold text-amber-700">
              {summary.open}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white p-4 shadow-sm">
          <CardContent className="p-0">
            <p className="text-sm text-slate-500">Unpaid / Authorized</p>
            <p className="mt-1 text-2xl font-semibold text-amber-700">
              {summary.pendingPayment}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white p-4 shadow-sm">
          <CardContent className="p-0">
            <p className="text-sm text-slate-500">Unfulfilled</p>
            <p className="mt-1 text-2xl font-semibold text-rose-600">
              {summary.unfulfilled}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white p-4 shadow-sm">
          <CardContent className="p-0">
            <p className="text-sm text-slate-500">Archived</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {summary.archived}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white p-4 shadow-sm">
        <CardContent className="p-0">
          <div className="flex flex-wrap gap-3">
            <Input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by order id, customer, or email"
              className="min-w-52 flex-1 bg-slate-50"
            />

            <Select
              value={financialFilter}
              onValueChange={(value) =>
                setFinancialFilter(value as "All" | FinancialStatus)
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Financial: All" />
              </SelectTrigger>
              <SelectContent>
                {financialFilters.map((value) => (
                  <SelectItem key={value} value={value}>
                    Financial: {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={fulfillmentFilter}
              onValueChange={(value) =>
                setFulfillmentFilter(value as "All" | FulfillmentStatus)
              }
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Fulfillment: All" />
              </SelectTrigger>
              <SelectContent>
                {fulfillmentFilters.map((value) => (
                  <SelectItem key={value} value={value}>
                    Fulfillment: {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={orderFilter}
              onValueChange={(value) => setOrderFilter(value as OrderFilter)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Order: All" />
              </SelectTrigger>
              <SelectContent>
                {orderFilters.map((value) => (
                  <SelectItem key={value} value={value}>
                    Order: {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-white shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Channel</TableHead>
                  <TableHead>Financial</TableHead>
                  <TableHead>Fulfillment</TableHead>
                  <TableHead>Delivery</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead
                    className={
                      stickyTotalColumn
                        ? "sticky right-0 z-10 border-l border-slate-200 bg-slate-50"
                        : ""
                    }
                  >
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    onClick={() => {
                      if (onOpenOrder) {
                        onOpenOrder(order.id);
                        return;
                      }
                      if (openInPlaceDrawer) {
                        setDrawerOrderId(order.id);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        if (onOpenOrder) {
                          onOpenOrder(order.id);
                          return;
                        }
                        if (openInPlaceDrawer) {
                          setDrawerOrderId(order.id);
                        }
                      }
                    }}
                    tabIndex={0}
                    className="group cursor-pointer focus:outline-none"
                  >
                    <TableCell>
                      <p className="font-medium text-slate-900">
                        {order.customer}
                      </p>
                      <p className="text-xs text-slate-500">{order.email}</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-900">{order.id}</p>
                        <span className="text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                          &gt;
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{order.date}</p>
                    </TableCell>
                    <TableCell className="text-slate-700">
                      {order.channel}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={badgeClass(order.financialStatus)}
                        variant="outline"
                      >
                        {order.financialStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={badgeClass(order.fulfillmentStatus)}
                        variant="outline"
                      >
                        {order.fulfillmentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={badgeClass(order.deliveryStatus)}
                        variant="outline"
                      >
                        {order.deliveryStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={badgeClass(getDisplayStatus(order))}
                        variant="outline"
                      >
                        {getDisplayStatus(order)}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`font-medium text-slate-900 ${
                        stickyTotalColumn
                          ? "sticky right-0 z-10 border-l border-slate-200 bg-white group-hover:bg-slate-50"
                          : ""
                      }`}
                    >
                      {order.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="border-t border-slate-100 px-4 py-8 text-center text-sm text-slate-500">
              No orders found. Try changing your filters.
            </div>
          )}
        </CardContent>
      </Card>
      <Sheet
        open={openInPlaceDrawer && !!drawerOrderId}
        onOpenChange={(open) => {
          if (!open) setDrawerOrderId(null);
        }}
      >
        <SheetContent
          side="right"
          className="w-full max-w-3xl overflow-y-auto p-5"
        >
          {drawerOrderId && (
            <OrderDetailsWorkspace
              orderId={drawerOrderId}
              mode="drawer"
              onClose={() => setDrawerOrderId(null)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
