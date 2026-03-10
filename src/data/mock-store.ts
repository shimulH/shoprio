import {
  Customer,
  KPI,
  Order,
  OrderAuditEntry,
  OrderLineItem,
  PaymentRecord,
  Product,
  ShippingLabel,
} from "@/types/dashboard";

function historyEntry(id: string, action: string, actor: string, timestamp: string) {
  return { id, action, actor, timestamp };
}

function lineItem(id: string, title: string, sku: string, quantity: number, unitPrice: string): OrderLineItem {
  return { id, title, sku, quantity, unitPrice };
}

function paymentRecord(
  id: string,
  kind: PaymentRecord["kind"],
  gateway: string,
  status: PaymentRecord["status"],
  amount: string,
  timestamp: string,
  reference: string,
): PaymentRecord {
  return { id, kind, gateway, status, amount, timestamp, reference };
}

function shippingLabel(
  id: string,
  carrier: string,
  service: string,
  trackingNumber: string,
  status: ShippingLabel["status"],
  createdAt: string,
): ShippingLabel {
  return { id, carrier, service, trackingNumber, status, createdAt };
}

function note(id: string, author: string, body: string, timestamp: string) {
  return { id, author, body, timestamp };
}

function audit(
  id: string,
  action: string,
  actor: string,
  actorRole: string,
  timestamp: string,
  result: "success" | "denied",
  previousHash: string,
  hash: string,
): OrderAuditEntry {
  return { id, action, actor, actorRole, timestamp, result, previousHash, hash };
}

export const kpis: KPI[] = [
  { label: "Total Sales", value: "$82,430", change: "+12.4%", trend: "up" },
  { label: "Orders", value: "1,284", change: "+8.1%", trend: "up" },
  { label: "Conversion", value: "3.8%", change: "-0.4%", trend: "down" },
  { label: "Returning Customers", value: "34%", change: "+2.2%", trend: "up" },
];

export const orders: Order[] = [
  {
    id: "#SHP-1821",
    customer: "Olivia Bennett",
    email: "olivia.bennett@example.com",
    date: "Mar 10, 2026",
    items: 3,
    channel: "Online Store",
    destination: "New York, US",
    total: "$132.00",
    financialStatus: "Paid",
    fulfillmentStatus: "Fulfilled",
    deliveryStatus: "Delivered",
    archived: true,
    cancelledAt: null,
    history: [
      historyEntry("h-1821-5", "Order archived", "Store Admin", "Mar 10, 2026, 5:42 PM"),
      historyEntry("h-1821-4", "Marked delivered", "Fulfillment Bot", "Mar 10, 2026, 2:15 PM"),
      historyEntry("h-1821-3", "Marked shipped with tracking", "Store Admin", "Mar 10, 2026, 10:10 AM"),
      historyEntry("h-1821-2", "Payment captured", "Store Admin", "Mar 10, 2026, 9:05 AM"),
      historyEntry("h-1821-1", "Order created", "Online Store", "Mar 10, 2026, 8:58 AM"),
    ],
    lineItems: [
      lineItem("li-1821-1", "Classic Denim Jacket", "JKT-CL-001", 1, "$79.00"),
      lineItem("li-1821-2", "Minimal Leather Wallet", "WLT-ML-003", 1, "$39.00"),
      lineItem("li-1821-3", "Shipping Protection", "SHIP-PROTECT", 1, "$14.00"),
    ],
    paymentRecords: [
      paymentRecord(
        "pay-1821-1",
        "Capture",
        "Stripe",
        "Success",
        "$132.00",
        "Mar 10, 2026, 9:05 AM",
        "ch_1821_capture",
      ),
    ],
    shippingLabels: [
      shippingLabel(
        "sl-1821-1",
        "UPS",
        "Ground",
        "1Z999AA10123456784",
        "Delivered",
        "Mar 10, 2026, 10:10 AM",
      ),
    ],
    notes: [note("n-1821-1", "Store Admin", "Gift message included by customer.", "Mar 10, 2026, 9:15 AM")],
    riskLevel: "Low",
    riskFlags: ["IP and billing country match"],
    tags: ["vip", "gift"],
    auditLog: [
      audit("a-1821-2", "Order archived", "Store Admin", "Manager", "Mar 10, 2026, 5:42 PM", "success", "hash-1821-1", "hash-1821-2"),
      audit("a-1821-1", "Payment captured", "Store Admin", "Manager", "Mar 10, 2026, 9:05 AM", "success", "GENESIS", "hash-1821-1"),
    ],
  },
  {
    id: "#SHP-1820",
    customer: "Ethan Reed",
    email: "ethan.reed@example.com",
    date: "Mar 10, 2026",
    items: 2,
    channel: "Instagram",
    destination: "Austin, US",
    total: "$89.50",
    financialStatus: "Paid",
    fulfillmentStatus: "Partially Fulfilled",
    deliveryStatus: "Shipped",
    archived: false,
    cancelledAt: null,
    history: [
      historyEntry("h-1820-4", "Marked shipped with tracking", "Store Admin", "Mar 10, 2026, 4:22 PM"),
      historyEntry("h-1820-3", "Marked partially fulfilled", "Warehouse Staff", "Mar 10, 2026, 3:55 PM"),
      historyEntry("h-1820-2", "Payment captured", "Store Admin", "Mar 10, 2026, 2:04 PM"),
      historyEntry("h-1820-1", "Order created", "Instagram Checkout", "Mar 10, 2026, 1:48 PM"),
    ],
    lineItems: [
      lineItem("li-1820-1", "Oversized Cotton Hoodie", "HD-OV-007", 1, "$64.00"),
      lineItem("li-1820-2", "Minimal Leather Wallet", "WLT-ML-003", 1, "$39.00"),
    ],
    paymentRecords: [
      paymentRecord("pay-1820-1", "Capture", "Shopify Payments", "Success", "$89.50", "Mar 10, 2026, 2:04 PM", "sp_1820_capture"),
    ],
    shippingLabels: [
      shippingLabel("sl-1820-1", "FedEx", "Express Saver", "612999990234", "In Transit", "Mar 10, 2026, 4:22 PM"),
    ],
    notes: [note("n-1820-1", "Support Agent", "Customer requested delivery before weekend.", "Mar 10, 2026, 2:20 PM")],
    riskLevel: "Medium",
    riskFlags: ["High AOV for first-time customer"],
    tags: ["instagram", "priority"],
    auditLog: [
      audit("a-1820-1", "Shipment label created", "Store Admin", "Manager", "Mar 10, 2026, 4:22 PM", "success", "GENESIS", "hash-1820-1"),
    ],
  },
  {
    id: "#SHP-1819",
    customer: "Mia Robinson",
    email: "mia.robinson@example.com",
    date: "Mar 9, 2026",
    items: 5,
    channel: "Online Store",
    destination: "Dhaka, BD",
    total: "$245.99",
    financialStatus: "Pending",
    fulfillmentStatus: "Unfulfilled",
    deliveryStatus: "Not Shipped",
    archived: false,
    cancelledAt: null,
    history: [
      historyEntry("h-1819-2", "Payment pending", "Payment Gateway", "Mar 9, 2026, 7:21 PM"),
      historyEntry("h-1819-1", "Order created", "Online Store", "Mar 9, 2026, 7:20 PM"),
    ],
    lineItems: [
      lineItem("li-1819-1", "Classic Denim Jacket", "JKT-CL-001", 2, "$79.00"),
      lineItem("li-1819-2", "Oversized Cotton Hoodie", "HD-OV-007", 1, "$64.00"),
    ],
    paymentRecords: [
      paymentRecord("pay-1819-1", "Authorization", "PayPal", "Pending", "$245.99", "Mar 9, 2026, 7:21 PM", "pp_1819_auth"),
    ],
    shippingLabels: [],
    notes: [note("n-1819-1", "Fraud Tool", "Manual review suggested due to new device fingerprint.", "Mar 9, 2026, 7:30 PM")],
    riskLevel: "High",
    riskFlags: ["New customer", "Device fingerprint mismatch"],
    tags: ["review", "high-risk"],
    auditLog: [
      audit("a-1819-1", "Manual risk review queued", "Risk Engine", "System", "Mar 9, 2026, 7:30 PM", "success", "GENESIS", "hash-1819-1"),
    ],
  },
  {
    id: "#SHP-1818",
    customer: "Noah Carter",
    email: "noah.carter@example.com",
    date: "Mar 9, 2026",
    items: 1,
    channel: "POS",
    destination: "Chicago, US",
    total: "$54.20",
    financialStatus: "Paid",
    fulfillmentStatus: "Fulfilled",
    deliveryStatus: "Delivered",
    archived: false,
    cancelledAt: null,
    history: [
      historyEntry("h-1818-4", "Marked delivered", "Courier Sync", "Mar 9, 2026, 6:41 PM"),
      historyEntry("h-1818-3", "Marked shipped", "Store Admin", "Mar 9, 2026, 12:02 PM"),
      historyEntry("h-1818-2", "Payment captured", "POS Terminal", "Mar 9, 2026, 10:35 AM"),
      historyEntry("h-1818-1", "Order created", "POS", "Mar 9, 2026, 10:34 AM"),
    ],
    lineItems: [lineItem("li-1818-1", "Minimal Leather Wallet", "WLT-ML-003", 1, "$39.00")],
    paymentRecords: [
      paymentRecord("pay-1818-1", "Capture", "POS Terminal", "Success", "$54.20", "Mar 9, 2026, 10:35 AM", "pos_1818_001"),
    ],
    shippingLabels: [shippingLabel("sl-1818-1", "DHL", "Parcel", "JD0146000062812345", "Delivered", "Mar 9, 2026, 12:02 PM")],
    notes: [],
    riskLevel: "Low",
    riskFlags: [],
    tags: ["pos"],
    auditLog: [
      audit("a-1818-1", "Order captured in POS", "POS Terminal", "System", "Mar 9, 2026, 10:35 AM", "success", "GENESIS", "hash-1818-1"),
    ],
  },
  {
    id: "#SHP-1817",
    customer: "Emma Davis",
    email: "emma.davis@example.com",
    date: "Mar 8, 2026",
    items: 2,
    channel: "Online Store",
    destination: "Toronto, CA",
    total: "$119.00",
    financialStatus: "Authorized",
    fulfillmentStatus: "Unfulfilled",
    deliveryStatus: "Not Shipped",
    archived: false,
    cancelledAt: null,
    history: [
      historyEntry("h-1817-2", "Payment authorized", "Payment Gateway", "Mar 8, 2026, 4:14 PM"),
      historyEntry("h-1817-1", "Order created", "Online Store", "Mar 8, 2026, 4:12 PM"),
    ],
    lineItems: [lineItem("li-1817-1", "Classic Denim Jacket", "JKT-CL-001", 1, "$79.00")],
    paymentRecords: [
      paymentRecord("pay-1817-1", "Authorization", "Stripe", "Success", "$119.00", "Mar 8, 2026, 4:14 PM", "pi_1817_auth"),
    ],
    shippingLabels: [],
    notes: [note("n-1817-1", "Support Agent", "Asked customer for apartment buzzer code.", "Mar 8, 2026, 4:30 PM")],
    riskLevel: "Low",
    riskFlags: ["Returning customer"],
    tags: ["canada"],
    auditLog: [
      audit("a-1817-1", "Payment authorized", "Payment Gateway", "System", "Mar 8, 2026, 4:14 PM", "success", "GENESIS", "hash-1817-1"),
    ],
  },
  {
    id: "#SHP-1816",
    customer: "James Turner",
    email: "james.turner@example.com",
    date: "Mar 8, 2026",
    items: 4,
    channel: "Instagram",
    destination: "London, UK",
    total: "$176.40",
    financialStatus: "Paid",
    fulfillmentStatus: "Fulfilled",
    deliveryStatus: "Shipped",
    archived: false,
    cancelledAt: null,
    history: [
      historyEntry("h-1816-4", "Marked shipped with tracking", "Store Admin", "Mar 8, 2026, 8:33 PM"),
      historyEntry("h-1816-3", "Marked fulfilled", "Warehouse Staff", "Mar 8, 2026, 7:40 PM"),
      historyEntry("h-1816-2", "Payment captured", "Store Admin", "Mar 8, 2026, 6:10 PM"),
      historyEntry("h-1816-1", "Order created", "Instagram Checkout", "Mar 8, 2026, 5:58 PM"),
    ],
    lineItems: [
      lineItem("li-1816-1", "Classic Denim Jacket", "JKT-CL-001", 1, "$79.00"),
      lineItem("li-1816-2", "Oversized Cotton Hoodie", "HD-OV-007", 1, "$64.00"),
    ],
    paymentRecords: [
      paymentRecord("pay-1816-1", "Capture", "Shopify Payments", "Success", "$176.40", "Mar 8, 2026, 6:10 PM", "sp_1816_capture"),
    ],
    shippingLabels: [shippingLabel("sl-1816-1", "Royal Mail", "Tracked 24", "RM24-1816-2231", "In Transit", "Mar 8, 2026, 8:33 PM")],
    notes: [],
    riskLevel: "Medium",
    riskFlags: ["Address line normalized"],
    tags: ["instagram"],
    auditLog: [
      audit("a-1816-1", "Shipment label created", "Store Admin", "Manager", "Mar 8, 2026, 8:33 PM", "success", "GENESIS", "hash-1816-1"),
    ],
  },
  {
    id: "#SHP-1815",
    customer: "Harper Young",
    email: "harper.young@example.com",
    date: "Mar 7, 2026",
    items: 1,
    channel: "Online Store",
    destination: "Sydney, AU",
    total: "$39.00",
    financialStatus: "Authorized",
    fulfillmentStatus: "Unfulfilled",
    deliveryStatus: "Not Shipped",
    archived: false,
    cancelledAt: null,
    history: [
      historyEntry("h-1815-2", "Payment authorized", "Payment Gateway", "Mar 7, 2026, 9:05 PM"),
      historyEntry("h-1815-1", "Order created", "Online Store", "Mar 7, 2026, 9:03 PM"),
    ],
    lineItems: [lineItem("li-1815-1", "Minimal Leather Wallet", "WLT-ML-003", 1, "$39.00")],
    paymentRecords: [
      paymentRecord("pay-1815-1", "Authorization", "Stripe", "Success", "$39.00", "Mar 7, 2026, 9:05 PM", "pi_1815_auth"),
    ],
    shippingLabels: [],
    notes: [],
    riskLevel: "Low",
    riskFlags: [],
    tags: ["wallet"],
    auditLog: [
      audit("a-1815-1", "Payment authorized", "Payment Gateway", "System", "Mar 7, 2026, 9:05 PM", "success", "GENESIS", "hash-1815-1"),
    ],
  },
  {
    id: "#SHP-1814",
    customer: "Lucas Wright",
    email: "lucas.wright@example.com",
    date: "Mar 7, 2026",
    items: 6,
    channel: "POS",
    destination: "Berlin, DE",
    total: "$312.10",
    financialStatus: "Partially Refunded",
    fulfillmentStatus: "Fulfilled",
    deliveryStatus: "Delivered",
    archived: false,
    cancelledAt: null,
    history: [
      historyEntry("h-1814-5", "Refund issued", "Store Admin", "Mar 9, 2026, 11:10 AM"),
      historyEntry("h-1814-4", "Marked delivered", "Courier Sync", "Mar 8, 2026, 4:00 PM"),
      historyEntry("h-1814-3", "Marked shipped", "Store Admin", "Mar 8, 2026, 9:12 AM"),
      historyEntry("h-1814-2", "Payment captured", "POS Terminal", "Mar 7, 2026, 2:28 PM"),
      historyEntry("h-1814-1", "Order created", "POS", "Mar 7, 2026, 2:24 PM"),
    ],
    lineItems: [
      lineItem("li-1814-1", "Classic Denim Jacket", "JKT-CL-001", 2, "$79.00"),
      lineItem("li-1814-2", "Oversized Cotton Hoodie", "HD-OV-007", 2, "$64.00"),
    ],
    paymentRecords: [
      paymentRecord("pay-1814-1", "Capture", "POS Terminal", "Success", "$312.10", "Mar 7, 2026, 2:28 PM", "pos_1814_001"),
      paymentRecord("pay-1814-2", "Refund", "POS Terminal", "Success", "$80.00", "Mar 9, 2026, 11:10 AM", "pos_1814_ref_01"),
    ],
    shippingLabels: [shippingLabel("sl-1814-1", "DHL", "Express", "JD0146000062819999", "Delivered", "Mar 8, 2026, 9:12 AM")],
    notes: [note("n-1814-1", "Store Admin", "Partial refund approved for damaged item.", "Mar 9, 2026, 11:10 AM")],
    riskLevel: "Low",
    riskFlags: [],
    tags: ["partial-refund"],
    auditLog: [
      audit("a-1814-2", "Refund issued", "Store Admin", "Manager", "Mar 9, 2026, 11:10 AM", "success", "hash-1814-1", "hash-1814-2"),
      audit("a-1814-1", "Payment captured", "POS Terminal", "System", "Mar 7, 2026, 2:28 PM", "success", "GENESIS", "hash-1814-1"),
    ],
  },
];

export const products: Product[] = [
  {
    id: "P-101",
    title: "Classic Denim Jacket",
    sku: "JKT-CL-001",
    inventory: 52,
    price: "$79.00",
    status: "Active",
  },
  {
    id: "P-102",
    title: "Minimal Leather Wallet",
    sku: "WLT-ML-003",
    inventory: 18,
    price: "$39.00",
    status: "Active",
  },
  {
    id: "P-103",
    title: "Oversized Cotton Hoodie",
    sku: "HD-OV-007",
    inventory: 0,
    price: "$64.00",
    status: "Draft",
  },
];

export const customers: Customer[] = [
  {
    id: "C-2301",
    name: "Ava Wilson",
    email: "ava.wilson@example.com",
    orders: 7,
    spent: "$843.00",
  },
  {
    id: "C-2302",
    name: "Liam Scott",
    email: "liam.scott@example.com",
    orders: 4,
    spent: "$422.50",
  },
  {
    id: "C-2303",
    name: "Sophia Hall",
    email: "sophia.hall@example.com",
    orders: 2,
    spent: "$199.00",
  },
];
