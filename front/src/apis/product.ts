import fetchClient from "@/apis/config/fetchClient";
import { BaseResponse, ListResponse } from "@/apis/config/type";
import { Product } from "@/types/product";

export function productAddApi({
  productName,
  description,
  category,
  price,
  quantity,
}: {
  productName: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}): Promise<BaseResponse> {
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

export function inserImageApi(
  imgFiles: FormData,
): Promise<ListResponse<Product>> {
  return fetchClient({
    method: "POST",
    url: "/images",
    data: imgFiles,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
