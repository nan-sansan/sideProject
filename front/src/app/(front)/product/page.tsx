import { getCategoriesListApi, productListApi } from "@/apis/product";
import ProductCard from "@/app/(front)/product/_component/ProductCard";
import { Product } from "@/types/product";
import CategoryBar from "@/app/(front)/product/_component/Categorybar";

type Props = {
  searchParams: Promise<{ category: string | undefined }>;
};

export default async function ProductPage({ searchParams }: Props) {
  const params = await searchParams;
  const categoryId = params.category;
  const { content: products } = await productListApi(categoryId);
  const { content: categories } = await getCategoriesListApi();

  return (
    <div className="mt-[80px] flex gap-2.5">
      <CategoryBar categories={categories} />
      <div className="w-[80vw] flex flex-wrap gap-5">
        {products.map((product: Product, index) => (
          <ProductCard key={index} item={product} />
        ))}
      </div>
    </div>
  );
}
