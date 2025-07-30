import fetchClient from "@/apis/config/fetchClient";
import { BaseResponse, ListResponse } from "@/apis/config/type";
import { Product } from "@/types/product";

export function productAddApi(
  productName: string,
  description: string,
  category: string,
  price: number,
  quantity: number,
): Promise<BaseResponse> {
  return fetchClient({
    method: "POST",
    url: "/products",
    data: {
      name: productName,
      description: description,
      categoryId: 1,
      price: price,
      quantity: quantity,
    },
  });
}

export function productListApi(): Promise<ListResponse<Product>> {
  return fetchClient({
    method: "GET",
    url: "/products",
  });
}
