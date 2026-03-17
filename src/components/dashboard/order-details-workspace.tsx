"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { orders } from "@/data/mock-store";
import { Order, PaymentRecord, ShippingLabel } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

type UserRole = "Owner" | "Manager" | "Support" | "Fulfillment";
type Permission =
  | "payment:capture"
  | "payment:refund"
  | "order:cancel"
  | "order:archive"
  | "fulfillment:update"
  | "shipping:update"
  | "shipping:label"
  | "note:add"
  | "tag:edit";
type ActionItem = {
  id: string;
  label: string;
  permission: Permission;
  apply: (order: Order, occurredAt: string) => Order;
};
type HistoryGroup = {
  label: "Today" | "Yesterday" | "Earlier";
  items: Order["history"];
};

const currentUser = {
  name: "Shimul Ahmed",
  role: "Manager" as UserRole,
};

const rolePermissions: Record<UserRole, Permission[]> = {
  Owner: [
    "payment:capture",
    "payment:refund",
    "order:cancel",
    "order:archive",
    "fulfillment:update",
    "shipping:update",
    "shipping:label",
    "note:add",
    "tag:edit",
  ],
  Manager: [
    "payment:capture",
    "payment:refund",
    "order:cancel",
    "order:archive",
    "fulfillment:update",
    "shipping:update",
    "shipping:label",
    "note:add",
    "tag:edit",
  ],
  Support: ["note:add", "tag:edit", "order:archive"],
  Fulfillment: [
    "fulfillment:update",
    "shipping:update",
    "shipping:label",
    "note:add",
  ],
};

function formatTimestamp(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function toHash(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return `h${Math.abs(hash).toString(16)}`;
}

function buildAuditEntry(
  order: Order,
  action: string,
  result: "success" | "denied",
  timestamp: string,
) {
  const previousHash = order.auditLog[0]?.hash ?? "GENESIS";
  const payload = `${order.id}|${action}|${currentUser.name}|${currentUser.role}|${result}|${timestamp}|${previousHash}`;
  return {
    id: `${order.id}-audit-${Date.now()}`,
    action,
    actor: currentUser.name,
    actorRole: currentUser.role,
    timestamp,
    result,
    previousHash,
    hash: toHash(payload),
  };
}

function hasPermission(permission: Permission) {
  return rolePermissions[currentUser.role].includes(permission);
}

function badgeClass(status: string) {
  if (status === "Paid" || status === "Fulfilled" || status === "Delivered")
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (status === "Pending" || status === "Unfulfilled" || status === "Open")
    return "bg-amber-100 text-amber-700 border-amber-200";
  if (
    status === "Authorized" ||
    status === "In Progress" ||
    status === "Partially Fulfilled" ||
    status === "Shipped"
  )
    return "bg-sky-100 text-sky-700 border-sky-200";
  if (
    status === "Refunded" ||
    status === "Partially Refunded" ||
    status === "Voided" ||
    status === "Canceled"
  )
    return "bg-rose-100 text-rose-700 border-rose-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function paymentStatusBadge(status: PaymentRecord["status"]) {
  if (status === "Success")
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (status === "Pending")
    return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-rose-100 text-rose-700 border-rose-200";
}

function shippingStatusBadge(status: ShippingLabel["status"]) {
  if (status === "Delivered")
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (status === "In Transit") return "bg-sky-100 text-sky-700 border-sky-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getHistoryGroups(entries: Order["history"]): HistoryGroup[] {
  const now = new Date();
  const todayStart = startOfDay(now);
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(todayStart.getDate() - 1);
  const groups: Record<HistoryGroup["label"], Order["history"]> = {
    Today: [],
    Yesterday: [],
    Earlier: [],
  };
  for (const entry of entries) {
    const parsed = new Date(entry.timestamp);
    if (Number.isNaN(parsed.getTime())) {
      groups.Earlier.push(entry);
    } else if (parsed >= todayStart) {
      groups.Today.push(entry);
    } else if (parsed >= yesterdayStart && parsed < todayStart) {
      groups.Yesterday.push(entry);
    } else {
      groups.Earlier.push(entry);
    }
  }
  return (["Today", "Yesterday", "Earlier"] as const)
    .map((label) => ({ label, items: groups[label] }))
    .filter((group) => group.items.length > 0);
}

function createShippingLabel(order: Order, occurredAt: string) {
  if (order.shippingLabels.length > 0) return order;
  const label: ShippingLabel = {
    id: `${order.id}-label-${Date.now()}`,
    carrier: "DHL",
    service: "Express",
    trackingNumber: `DHL-${Math.floor(Math.random() * 1000000000)}`,
    status: "Created",
    createdAt: occurredAt,
  };
  return {
    ...order,
    shippingLabels: [label, ...order.shippingLabels],
    history: [
      {
        id: `${order.id}-hist-${Date.now()}`,
        action: `Shipping label created (${label.carrier})`,
        actor: "Carrier API",
        timestamp: occurredAt,
      },
      ...order.history,
    ],
  };
}

function getAvailableActions(order: Order): ActionItem[] {
  const actions: ActionItem[] = [];
  if (order.cancelledAt) {
    actions.push(
      order.archived
        ? {
            id: "unarchive",
            label: "Unarchive",
            permission: "order:archive",
            apply: (item) => ({ ...item, archived: false }),
          }
        : {
            id: "archive",
            label: "Archive",
            permission: "order:archive",
            apply: (item) => ({ ...item, archived: true }),
          },
    );
    return actions;
  }
  if (
    order.financialStatus === "Pending" ||
    order.financialStatus === "Authorized"
  ) {
    actions.push({
      id: "capture",
      label: "Capture payment",
      permission: "payment:capture",
      apply: (item, occurredAt) => ({
        ...item,
        financialStatus: "Paid",
        paymentRecords: [
          {
            id: `${item.id}-payment-${Date.now()}`,
            kind: "Capture",
            gateway: "Shopify Payments",
            status: "Success",
            amount: item.total,
            timestamp: occurredAt,
            reference: `sp_${Date.now()}`,
          },
          ...item.paymentRecords,
        ],
      }),
    });
  }
  if (
    order.financialStatus === "Paid" &&
    order.fulfillmentStatus === "Unfulfilled"
  )
    actions.push({
      id: "start-fulfillment",
      label: "Start fulfillment",
      permission: "fulfillment:update",
      apply: (item) => ({ ...item, fulfillmentStatus: "In Progress" }),
    });
  if (
    order.financialStatus === "Paid" &&
    order.fulfillmentStatus === "In Progress"
  )
    actions.push({
      id: "partial-fulfillment",
      label: "Mark partially fulfilled",
      permission: "fulfillment:update",
      apply: (item) => ({ ...item, fulfillmentStatus: "Partially Fulfilled" }),
    });
  if (
    order.financialStatus === "Paid" &&
    (order.fulfillmentStatus === "In Progress" ||
      order.fulfillmentStatus === "Partially Fulfilled")
  )
    actions.push({
      id: "full-fulfillment",
      label: "Mark fulfilled",
      permission: "fulfillment:update",
      apply: (item) => ({ ...item, fulfillmentStatus: "Fulfilled" }),
    });
  if (
    order.fulfillmentStatus === "Fulfilled" &&
    order.deliveryStatus === "Not Shipped"
  ) {
    actions.push({
      id: "create-label",
      label: "Create shipping label",
      permission: "shipping:label",
      apply: (item, occurredAt) => createShippingLabel(item, occurredAt),
    });
    actions.push({
      id: "ship",
      label: "Mark shipped",
      permission: "shipping:update",
      apply: (item, occurredAt) => {
        const withLabel = createShippingLabel(item, occurredAt);
        return {
          ...withLabel,
          deliveryStatus: "Shipped",
          shippingLabels: withLabel.shippingLabels.map((label, idx) =>
            idx === 0 ? { ...label, status: "In Transit" } : label,
          ),
        };
      },
    });
  }
  if (order.deliveryStatus === "Shipped")
    actions.push({
      id: "deliver",
      label: "Mark delivered",
      permission: "shipping:update",
      apply: (item) => ({
        ...item,
        deliveryStatus: "Delivered",
        shippingLabels: item.shippingLabels.map((label, idx) =>
          idx === 0 ? { ...label, status: "Delivered" } : label,
        ),
      }),
    });
  if (
    order.financialStatus === "Paid" ||
    order.financialStatus === "Partially Refunded"
  )
    actions.push({
      id: "refund",
      label: "Refund order",
      permission: "payment:refund",
      apply: (item, occurredAt) => ({
        ...item,
        financialStatus: "Refunded",
        paymentRecords: [
          {
            id: `${item.id}-refund-${Date.now()}`,
            kind: "Refund",
            gateway: "Shopify Payments",
            status: "Success",
            amount: item.total,
            timestamp: occurredAt,
            reference: `rf_${Date.now()}`,
          },
          ...item.paymentRecords,
        ],
      }),
    });
  if (order.deliveryStatus === "Not Shipped")
    actions.push({
      id: "cancel",
      label: "Cancel order",
      permission: "order:cancel",
      apply: (item, occurredAt) => ({
        ...item,
        cancelledAt: occurredAt,
        financialStatus:
          item.financialStatus === "Paid" ? "Refunded" : "Voided",
        fulfillmentStatus:
          item.fulfillmentStatus === "Fulfilled" ||
          item.fulfillmentStatus === "Partially Fulfilled" ||
          item.fulfillmentStatus === "In Progress"
            ? "Restocked"
            : "Unfulfilled",
      }),
    });
  if (
    !order.archived &&
    (order.deliveryStatus === "Delivered" ||
      order.financialStatus === "Refunded")
  )
    actions.push({
      id: "archive",
      label: "Archive",
      permission: "order:archive",
      apply: (item) => ({ ...item, archived: true }),
    });
  if (order.archived)
    actions.push({
      id: "unarchive",
      label: "Unarchive",
      permission: "order:archive",
      apply: (item) => ({ ...item, archived: false }),
    });
  return actions;
}

function getTimelineState(order: Order) {
  return [
    { label: "Order Created", state: "done" as const },
    {
      label: "Payment Processing",
      state:
        order.financialStatus === "Pending"
          ? ("current" as const)
          : ("done" as const),
      detail: order.financialStatus,
    },
    {
      label: "Ready for Fulfillment",
      state:
        order.financialStatus === "Paid"
          ? ("done" as const)
          : ("upcoming" as const),
    },
    {
      label: "Fulfillment Process",
      state:
        order.fulfillmentStatus === "Unfulfilled"
          ? ("upcoming" as const)
          : order.fulfillmentStatus === "Fulfilled"
            ? ("done" as const)
            : ("current" as const),
      detail: order.fulfillmentStatus,
    },
    {
      label: "Order Shipped",
      state:
        order.deliveryStatus === "Shipped" ||
        order.deliveryStatus === "Delivered"
          ? ("done" as const)
          : ("upcoming" as const),
    },
    {
      label: "Delivered to Customer",
      state:
        order.deliveryStatus === "Delivered"
          ? ("done" as const)
          : ("upcoming" as const),
      detail: order.deliveryStatus,
    },
    {
      label: "Order Completed",
      state: order.archived ? ("done" as const) : ("upcoming" as const),
      detail: order.archived ? "Archived" : "Not archived",
    },
  ];
}

type Props = {
  orderId: string;
  mode?: "page" | "drawer";
  onClose?: () => void;
};

export function OrderDetailsWorkspace({
  orderId,
  mode = "page",
  onClose,
}: Props) {
  const [orderData, setOrderData] = useState<Order | null>(
    () => orders.find((item) => item.id === orderId) ?? null,
  );
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState("");
  const [tagInput, setTagInput] = useState("");

  const availableActions = useMemo(
    () => (orderData ? getAvailableActions(orderData) : []),
    [orderData],
  );
  const timeline = useMemo(
    () => (orderData ? getTimelineState(orderData) : []),
    [orderData],
  );
  const historyGroups = useMemo(
    () => (orderData ? getHistoryGroups(orderData.history) : []),
    [orderData],
  );

  function applyAction(action: ActionItem) {
    if (!orderData) return;
    const occurredAt = formatTimestamp(new Date());
    if (!hasPermission(action.permission)) {
      setOrderData((current) =>
        current
          ? {
              ...current,
              auditLog: [
                buildAuditEntry(current, action.label, "denied", occurredAt),
                ...current.auditLog,
              ],
            }
          : current,
      );
      setUpdateMessage(
        `Permission denied for "${action.label}" as ${currentUser.role}.`,
      );
      return;
    }
    setOrderData((current) =>
      current
        ? {
            ...action.apply(current, occurredAt),
            history: [
              {
                id: `${current.id}-${Date.now()}`,
                action: action.label,
                actor: currentUser.name,
                timestamp: occurredAt,
              },
              ...current.history,
            ],
            auditLog: [
              buildAuditEntry(current, action.label, "success", occurredAt),
              ...current.auditLog,
            ],
          }
        : current,
    );
    setUpdateMessage(`${action.label} applied by ${currentUser.role}.`);
  }

  function addNote() {
    if (!orderData || !noteInput.trim()) return;
    if (!hasPermission("note:add")) {
      setUpdateMessage("Permission denied: cannot add notes.");
      return;
    }
    const occurredAt = formatTimestamp(new Date());
    setOrderData((current) =>
      current
        ? {
            ...current,
            notes: [
              {
                id: `${current.id}-note-${Date.now()}`,
                author: currentUser.name,
                body: noteInput.trim(),
                timestamp: occurredAt,
              },
              ...current.notes,
            ],
            auditLog: [
              buildAuditEntry(current, "Add note", "success", occurredAt),
              ...current.auditLog,
            ],
          }
        : current,
    );
    setNoteInput("");
    setUpdateMessage("Order note added.");
  }

  function addTag() {
    if (!orderData || !tagInput.trim()) return;
    if (!hasPermission("tag:edit")) {
      setUpdateMessage("Permission denied: cannot edit tags.");
      return;
    }
    const tag = tagInput.trim().toLowerCase();
    const occurredAt = formatTimestamp(new Date());
    setOrderData((current) =>
      current && !current.tags.includes(tag)
        ? {
            ...current,
            tags: [...current.tags, tag],
            auditLog: [
              buildAuditEntry(
                current,
                `Add tag: ${tag}`,
                "success",
                occurredAt,
              ),
              ...current.auditLog,
            ],
          }
        : current,
    );
    setTagInput("");
    setUpdateMessage(`Tag "${tag}" added.`);
  }

  function removeTag(tag: string) {
    if (!orderData) return;
    if (!hasPermission("tag:edit")) {
      setUpdateMessage("Permission denied: cannot edit tags.");
      return;
    }
    const occurredAt = formatTimestamp(new Date());
    setOrderData((current) =>
      current
        ? {
            ...current,
            tags: current.tags.filter((item) => item !== tag),
            auditLog: [
              buildAuditEntry(
                current,
                `Remove tag: ${tag}`,
                "success",
                occurredAt,
              ),
              ...current.auditLog,
            ],
          }
        : current,
    );
    setUpdateMessage(`Tag "${tag}" removed.`);
  }

  if (!orderData) {
    return (
      <Card className="bg-white p-6">
        <CardContent className="p-0">
          <p className="text-sm text-slate-600">Order not found.</p>
          {mode === "page" ? (
            <Link
              href="/orders"
              className="mt-3 inline-block text-sm font-medium text-slate-900 underline"
            >
              Back to orders
            </Link>
          ) : (
            onClose && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="mt-3"
              >
                Close
              </Button>
            )
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          {mode === "page" ? (
            <Link
              href="/orders"
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              {"<- Back to Orders"}
            </Link>
          ) : (
            <p className="text-sm text-slate-500">Order details</p>
          )}
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            {orderData.id}
          </h2>
          <p className="text-sm text-slate-500">
            {orderData.customer} - {orderData.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs text-slate-500">
            Current user: {currentUser.name} ({currentUser.role})
          </p>
          {mode === "drawer" && onClose && (
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="space-y-4">
          <Card className="bg-white">
            <CardHeader className="px-4 py-3 border-b border-slate-100">
              <CardTitle className="text-sm">Line Items</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3 space-y-2">
              {orderData.lineItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-md bg-slate-50 p-2 text-sm"
                >
                  <div>
                    <p className="font-medium text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">
                      {item.sku} x{item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-slate-800">{item.unitPrice}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="px-4 py-3 border-b border-slate-100">
              <CardTitle className="text-sm">Payment</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3 space-y-2">
              {orderData.paymentRecords.map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-md bg-slate-50 p-2 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-800">
                      {payment.kind} via {payment.gateway}
                    </p>
                    <Badge
                      className={paymentStatusBadge(payment.status)}
                      variant="outline"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {payment.amount} - {payment.reference} - {payment.timestamp}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="px-4 py-3 border-b border-slate-100">
              <CardTitle className="text-sm">Shipping Labels</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3 space-y-2">
              {orderData.shippingLabels.length === 0 && (
                <p className="text-xs text-slate-500">
                  No shipping labels created yet.
                </p>
              )}
              {orderData.shippingLabels.map((label) => (
                <div
                  key={label.id}
                  className="rounded-md bg-slate-50 p-2 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-800">
                      {label.carrier} - {label.service}
                    </p>
                    <Badge
                      className={shippingStatusBadge(label.status)}
                      variant="outline"
                    >
                      {label.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {label.trackingNumber} - {label.createdAt}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="px-4 py-3 border-b border-slate-100">
              <CardTitle className="text-sm">Notes</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3 space-y-2">
              {orderData.notes.length === 0 && (
                <p className="text-xs text-slate-500">No notes yet.</p>
              )}
              {orderData.notes.map((entry) => (
                <div key={entry.id} className="rounded-md bg-slate-50 p-2">
                  <p className="text-sm text-slate-700">{entry.body}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {entry.timestamp} by {entry.author}
                  </p>
                </div>
              ))}
              <div className="mt-3 flex gap-2 pt-1">
                <Textarea
                  value={noteInput}
                  onChange={(event) => setNoteInput(event.target.value)}
                  placeholder="Add internal note"
                  className="min-h-0 flex-1 py-1.5 text-sm"
                  rows={2}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addNote}
                  className="self-end"
                >
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-4">
          <Card className="bg-white">
            <CardHeader className="px-4 py-3 border-b border-slate-100">
              <CardTitle className="text-sm">Order Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3 space-y-1 text-sm text-slate-700">
              <p>Total: {orderData.total}</p>
              <p>Destination: {orderData.destination}</p>
              <p>Channel: {orderData.channel}</p>
              <p>Created: {orderData.date}</p>
              <p className="pt-1 flex items-center gap-2">
                Financial:
                <Badge
                  className={badgeClass(orderData.financialStatus)}
                  variant="outline"
                >
                  {orderData.financialStatus}
                </Badge>
              </p>
              <p className="flex items-center gap-2">
                Fulfillment:
                <Badge
                  className={badgeClass(orderData.fulfillmentStatus)}
                  variant="outline"
                >
                  {orderData.fulfillmentStatus}
                </Badge>
              </p>
              <p className="flex items-center gap-2">
                Delivery:
                <Badge
                  className={badgeClass(orderData.deliveryStatus)}
                  variant="outline"
                >
                  {orderData.deliveryStatus}
                </Badge>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-50">
            <CardHeader className="px-4 py-3 border-b border-slate-100">
              <CardTitle className="text-sm">Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3 grid gap-2">
              {availableActions.map((action) => (
                <Button
                  key={action.id}
                  variant="white"
                  onClick={() => applyAction(action)}
                  disabled={!hasPermission(action.permission)}
                  className="justify-start"
                >
                  {action.label}
                </Button>
              ))}
              {updateMessage && (
                <p className="mt-1 text-sm text-emerald-600">{updateMessage}</p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="px-4 py-3 border-b border-slate-100">
              <CardTitle className="text-sm">Risk &amp; Tags</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3 space-y-2">
              <p className="flex items-center gap-2 text-sm text-slate-700">
                Risk level:
                <Badge
                  className={badgeClass(orderData.riskLevel)}
                  variant="outline"
                >
                  {orderData.riskLevel}
                </Badge>
              </p>
              <ul className="space-y-1 text-xs text-slate-600">
                {orderData.riskFlags.length === 0 && (
                  <li>No active risk flags.</li>
                )}
                {orderData.riskFlags.map((flag) => (
                  <li key={flag}>- {flag}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                {orderData.tags.map((tag) => (
                  <Button
                    key={tag}
                    variant="secondary"
                    size="sm"
                    onClick={() => removeTag(tag)}
                    className="h-auto rounded-full px-2 py-1 text-xs"
                  >
                    #{tag} ×
                  </Button>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <Input
                  value={tagInput}
                  onChange={(event) => setTagInput(event.target.value)}
                  placeholder="add-tag"
                  className="flex-1 h-8 text-sm"
                />
                <Button variant="outline" size="sm" onClick={addTag}>
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="px-4 py-3 border-b border-slate-100">
              <CardTitle className="text-sm">Order Lifecycle</CardTitle>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <ul className="space-y-2">
                {timeline.map((stage) => (
                  <li
                    key={stage.label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${stage.state === "done" ? "bg-emerald-500" : stage.state === "current" ? "bg-slate-900" : "bg-slate-300"}`}
                    />
                    <span
                      className={
                        stage.state === "upcoming"
                          ? "text-slate-500"
                          : "text-slate-800"
                      }
                    >
                      {stage.label}
                      {stage.detail ? ` - ${stage.detail}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="px-4 py-3 border-b border-slate-100">
              <CardTitle className="text-sm">Timeline History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-64 px-4 py-3">
                <div className="space-y-4">
                  {historyGroups.map((group) => (
                    <div key={group.label}>
                      <p className="sticky top-0 z-10 bg-white py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {group.label}
                      </p>
                      <ul className="mt-2 space-y-3">
                        {group.items.map((entry) => (
                          <li
                            key={entry.id}
                            className="border-l-2 border-slate-200 pl-3"
                          >
                            <p className="text-sm font-medium text-slate-800">
                              {entry.action}
                            </p>
                            <p className="text-xs text-slate-500">
                              {entry.timestamp} by {entry.actor}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="px-4 py-3 border-b border-slate-100">
              <CardTitle className="text-sm">Audit Integrity Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-52">
                <div className="divide-y divide-slate-100">
                  {orderData.auditLog.map((entry) => (
                    <div key={entry.id} className="p-3 text-xs">
                      <p className="font-medium text-slate-800">
                        {entry.action} - {entry.result.toUpperCase()}
                      </p>
                      <p className="text-slate-500">
                        {entry.timestamp} by {entry.actor} ({entry.actorRole})
                      </p>
                      <p className="mt-1 text-slate-500">
                        prev: {entry.previousHash}
                      </p>
                      <p className="text-slate-500">hash: {entry.hash}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
