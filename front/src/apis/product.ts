import fetchClient from "@/apis/config/fetchClient";
import { BaseResponse, DataResponse, ListResponse } from "@/apis/config/type";
import { Category, Product } from "@/types/product";

type ProductUpsert = {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  quantity: number;
  imageIds: string[];
};

export function productAddApi({
  name,
  description,
  categoryId,
  price,
  quantity,
}: ProductUpsert): Promise<BaseResponse> {
  return fetchClient({
    method: "POST",
    url: "/products",
    data: {
      name: name,
      description: description,
      categoryId: categoryId,
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

export function updateProductApi(
  productId: string,
  product: ProductUpsert,
): Promise<BaseResponse> {
  return fetchClient({
    method: "PUT",
    url: "/products/" + productId,
    data: product,
  });
}

export function deleteProductApi(productId: string): Promise<BaseResponse> {
  return fetchClient({
    method: "DELETE",
    url: "/products/" + productId,
  });
}

export function getCategoriesListApi(): Promise<ListResponse<Category>> {
  return fetchClient({
    method: "GET",
    url: "/products/categories",
  });
}

export function insertImageApi(
  imgFiles: FormData,
): Promise<DataResponse<{ imageId: string }>> {
  return fetchClient({
    method: "POST",
    url: "/images",
    data: imgFiles,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
