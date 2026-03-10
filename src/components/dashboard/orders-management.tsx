"use client";

import { useMemo, useState } from "react";
import { OrderDetailsWorkspace } from "@/components/dashboard/order-details-workspace";
import { orders } from "@/data/mock-store";
import { FinancialStatus, FulfillmentStatus, Order } from "@/types/dashboard";

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
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Pending" || status === "Unfulfilled" || status === "Open") {
    return "bg-amber-100 text-amber-700";
  }

  if (
    status === "Authorized" ||
    status === "In Progress" ||
    status === "Partially Fulfilled" ||
    status === "Shipped"
  ) {
    return "bg-sky-100 text-sky-700";
  }

  if (
    status === "Refunded" ||
    status === "Partially Refunded" ||
    status === "Voided" ||
    status === "Canceled"
  ) {
    return "bg-rose-100 text-rose-700";
  }

  return "bg-slate-100 text-slate-700";
}

function getSummary(data: Order[]) {
  return {
    total: data.length,
    open: data.filter((order) => getDisplayStatus(order) === "Open").length,
    pendingPayment: data.filter(
      (order) => order.financialStatus === "Pending" || order.financialStatus === "Authorized",
    ).length,
    unfulfilled: data.filter((order) => order.fulfillmentStatus === "Unfulfilled").length,
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
  const [financialFilter, setFinancialFilter] = useState<"All" | FinancialStatus>("All");
  const [fulfillmentFilter, setFulfillmentFilter] = useState<"All" | FulfillmentStatus>("All");
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

      const matchesFinancial = financialFilter === "All" || order.financialStatus === financialFilter;
      const matchesFulfillment =
        fulfillmentFilter === "All" || order.fulfillmentStatus === fulfillmentFilter;
      const displayStatus = getDisplayStatus(order);
      const matchesOrder = orderFilter === "All" || displayStatus === orderFilter;

      return matchesSearch && matchesFinancial && matchesFulfillment && matchesOrder;
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
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Orders</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.total}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Open Orders</p>
          <p className="mt-1 text-2xl font-semibold text-amber-700">{summary.open}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Unpaid / Authorized</p>
          <p className="mt-1 text-2xl font-semibold text-amber-700">{summary.pendingPayment}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Unfulfilled</p>
          <p className="mt-1 text-2xl font-semibold text-rose-600">{summary.unfulfilled}</p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Archived</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{summary.archived}</p>
        </article>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by order id, customer, or email"
            className="min-w-52 flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400"
          />

          <select
            value={financialFilter}
            onChange={(event) => setFinancialFilter(event.target.value as "All" | FinancialStatus)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
          >
            {financialFilters.map((value) => (
              <option key={value} value={value}>
                Financial: {value}
              </option>
            ))}
          </select>

          <select
            value={fulfillmentFilter}
            onChange={(event) =>
              setFulfillmentFilter(event.target.value as "All" | FulfillmentStatus)
            }
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
          >
            {fulfillmentFilters.map((value) => (
              <option key={value} value={value}>
                Fulfillment: {value}
              </option>
            ))}
          </select>

          <select
            value={orderFilter}
            onChange={(event) => setOrderFilter(event.target.value as OrderFilter)}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none"
          >
            {orderFilters.map((value) => (
              <option key={value} value={value}>
                Order: {value}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Order</th>
                <th className="px-4 py-3 font-medium">Channel</th>
                <th className="px-4 py-3 font-medium">Financial</th>
                <th className="px-4 py-3 font-medium">Fulfillment</th>
                <th className="px-4 py-3 font-medium">Delivery</th>
                <th className="px-4 py-3 font-medium">Order</th>
                <th
                  className={`px-4 py-3 font-medium ${
                    stickyTotalColumn
                      ? "sticky right-0 z-10 border-l border-slate-200 bg-slate-50"
                      : ""
                  }`}
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
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
                  className="group cursor-pointer border-t border-slate-100 transition hover:bg-slate-50 focus:bg-slate-50 focus:outline-none"
                >
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900">{order.customer}</p>
                    <p className="text-xs text-slate-500">{order.email}</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-900">{order.id}</p>
                      <span className="text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                        &gt;
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{order.date}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{order.channel}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${badgeClass(order.financialStatus)}`}>
                      {order.financialStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${badgeClass(order.fulfillmentStatus)}`}>
                      {order.fulfillmentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${badgeClass(order.deliveryStatus)}`}>
                      {order.deliveryStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${badgeClass(getDisplayStatus(order))}`}>
                      {getDisplayStatus(order)}
                    </span>
                  </td>
                  <td
                    className={`px-4 py-3 font-medium text-slate-900 ${
                      stickyTotalColumn
                        ? "sticky right-0 z-10 border-l border-slate-200 bg-white group-hover:bg-slate-50"
                        : ""
                    }`}
                  >
                    {order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="border-t border-slate-100 px-4 py-8 text-center text-sm text-slate-500">
            No orders found. Try changing your filters.
          </div>
        )}
      </section>

      {openInPlaceDrawer && drawerOrderId && (
        <div className="fixed inset-0 z-40">
          <button
            aria-label="Close order drawer"
            onClick={() => setDrawerOrderId(null)}
            className="absolute inset-0 bg-black/20"
          />
          <aside className="absolute right-0 top-0 h-full w-full max-w-3xl overflow-y-auto border-l border-slate-200 bg-slate-50 p-5 shadow-xl">
            <OrderDetailsWorkspace
              orderId={drawerOrderId}
              mode="drawer"
              onClose={() => setDrawerOrderId(null)}
            />
          </aside>
        </div>
      )}
    </div>
  );
}
