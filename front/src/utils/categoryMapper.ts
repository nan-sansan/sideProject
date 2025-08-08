import { getCategoriesListApi } from "@/apis/product";

export async function categoryMapper(id: string) {
  const { content: categories } = await getCategoriesListApi();
  const category = categories.find((c) => c.id === id);
  return category ? category.name : "未知類別";
}
