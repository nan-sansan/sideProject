"use client";
import { getProductListByCategoryApi } from "@/apis/product";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/app/(front)/product/_component/ProductCard";

export default function RecommendList({
  currentProductId,
}: {
  currentProductId: string;
}) {
  const [recommend, setRecommend] = useState<Product[]>();

  const getProductList = async (currentId: string) => {
    const { content: products } = await getProductListByCategoryApi();

    const filtered = products.filter(
      (product, index, self) =>
        product.id !== currentId &&
        index === self.findIndex((p) => p.id === product.id), // 去除重複 id
    );

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setRecommend(shuffled.slice(0, 4));
  };

  useEffect(() => {
    getProductList(currentProductId);
  }, [currentProductId]);

  return (
    <div className="flex max-w-[800px]  ml-[15vw] gap-5 my-10">
      {recommend &&
        recommend.map((product) => {
          return <ProductCard key={product.id} item={product} />;
        })}
    </div>
  );
}
