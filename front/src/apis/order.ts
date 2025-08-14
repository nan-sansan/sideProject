import fetchClient from "@/apis/config/fetchClient";
import { DataResponse, ListResponse } from "@/apis/config/type";
import { Order } from "@/types/orders";

type CartItem = {
  productId: string;
  quantity: number;
};

type OrderUpsert = {
  status: string;
  comment: string;
};

export function getOrders(): Promise<ListResponse<Order>> {
  return fetchClient({
    method: "GET",
    url: "/orders",
  });
}

export function createOrder(
  items: CartItem[],
): Promise<DataResponse<CartItem>> {
  return fetchClient({
    method: "POST",
    url: "/orders",
    data: items,
  });
}

export function updateOrderApi(
  orderId: string,
  item: OrderUpsert,
): Promise<DataResponse<CartItem>> {
  return fetchClient({
    method: "PUT",
    url: "/orders/" + orderId,
    data: { status: item.status, comment: item.comment },
  });
}
