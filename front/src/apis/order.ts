import fetchClient from "@/apis/config/fetchClient";
import { BaseResponse } from "@/apis/config/type";

export function getOrders(): Promise<BaseResponse> {
  return fetchClient({
    method: "GET",
    url: "/orders",
  });
}
