import fetchClient from "@/apis/config/fetchClient";
import { BaseResponse } from "@/apis/config/type";

export function productAddApi(
  productName: string,
  description: string,
  category: string,
  price: number,
  quantity: number,
  mainImage: File,
  subImages: File[],
): Promise<BaseResponse> {
  const formData = new FormData();
  formData.append("name", productName);
  formData.append("description", description);
  formData.append("category", category);
  formData.append("price", price.toString());
  formData.append("quantity", quantity.toString());
  formData.append("mainImage", mainImage);
  subImages.forEach((file) => {
    formData.append("subImages", file);
  });

  return fetchClient({
    method: "POST",
    url: "public/product/add",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
