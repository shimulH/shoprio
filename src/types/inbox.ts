export type Platform =
  | "facebook"
  | "whatsapp"
  | "tiktok"
  | "instagram"
  | "messenger";

export type ChatMessage = {
  id: string;
  sender: "customer" | "agent";
  content: string;
  timestamp: string;
};

export type LiveProduct = {
  id: string;
  title: string;
  price: string;
  sku: string;
  variants: string[];
};

export type QueryResult = {
  currentQuery: string;
  product: string | null;
  variant: string | null;
  deliveryDate: string | null;
};

export type OrderDraft = {
  productName: string;
  variant: string;
  quantity: number;
  deliveryDate: string;
  address: string;
  phone: string;
  placed: boolean;
};

export type Conversation = {
  id: string;
  customer: string;
  platform: Platform;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: ChatMessage[];
  liveProduct: LiveProduct | null;
  queryResult: QueryResult | null;
  orderDraft: OrderDraft | null;
};
