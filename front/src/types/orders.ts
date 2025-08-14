export type Order = {
  id: string;
  customer: string;
  snapshot: string;
  total: number;
  status: string;
  comment: string;
};

export type SnapshotItem = { price: number; name: string; quantity: number };
export type OrderStatus = "PENDING" | "SHIPPED" | "CANCEL";
