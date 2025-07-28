export type Order = {
  id: string;
  customer: string;
  snapshot: string;
  total: number;
  status: string;
  comments: string | null;
};

export type SnapshotItem = { price: number; name: string; quantity: number };
export type OrderStatus = "PENDING" | "SHIPPED" | "CANCELED";
