export type FinancialStatus =
  | "Pending"
  | "Authorized"
  | "Partially Paid"
  | "Paid"
  | "Partially Refunded"
  | "Refunded"
  | "Voided";
export type FulfillmentStatus =
  | "Unfulfilled"
  | "In Progress"
  | "Partially Fulfilled"
  | "Fulfilled"
  | "Restocked";
export type DeliveryStatus = "Not Shipped" | "Shipped" | "Delivered";
export type OrderHistoryEntry = {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
};
export type OrderLineItem = {
  id: string;
  title: string;
  sku: string;
  quantity: number;
  unitPrice: string;
};
export type PaymentRecord = {
  id: string;
  kind: "Authorization" | "Capture" | "Refund" | "Void";
  gateway: string;
  status: "Success" | "Pending" | "Failed";
  amount: string;
  timestamp: string;
  reference: string;
};
export type ShippingLabel = {
  id: string;
  carrier: string;
  service: string;
  trackingNumber: string;
  status: "Created" | "In Transit" | "Delivered";
  createdAt: string;
};
export type OrderNote = {
  id: string;
  author: string;
  body: string;
  timestamp: string;
};
export type OrderAuditEntry = {
  id: string;
  action: string;
  actor: string;
  actorRole: string;
  timestamp: string;
  result: "success" | "denied";
  previousHash: string;
  hash: string;
};

export type KPI = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
};

export type Order = {
  id: string;
  customer: string;
  email: string;
  date: string;
  items: number;
  channel: "Online Store" | "Instagram" | "POS";
  destination: string;
  total: string;
  financialStatus: FinancialStatus;
  fulfillmentStatus: FulfillmentStatus;
  deliveryStatus: DeliveryStatus;
  archived: boolean;
  cancelledAt: string | null;
  history: OrderHistoryEntry[];
  lineItems: OrderLineItem[];
  paymentRecords: PaymentRecord[];
  shippingLabels: ShippingLabel[];
  notes: OrderNote[];
  riskLevel: "Low" | "Medium" | "High";
  riskFlags: string[];
  tags: string[];
  auditLog: OrderAuditEntry[];
};

export type Product = {
  id: string;
  title: string;
  sku: string;
  inventory: number;
  price: string;
  status: "Active" | "Draft";
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: string;
};
