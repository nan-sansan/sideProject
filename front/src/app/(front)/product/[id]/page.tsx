import { getProductWithId } from "@/apis/product";
import { makeImageUrl } from "@/utils/urlHelper";
import Image from "next/image";
import { categoryMapper } from "@/utils/categoryMapper";
import QuantityBar from "@/components/QuantityBar";
import RecommendList from "@/app/(front)/product/_component/RecommendList";

type Param = { id: string };

type Prop = {
  params: Promise<Param>;
};

export default async function ProductPage({ params }: Prop) {
  const { id } = await params;
  const { content: productInfo } = await getProductWithId(id);
  const categoryName = await categoryMapper(productInfo.categoryId);

  return (
    <div>
      <div className="mt-[7vw] flex">
        <div
          className="relative ml-30 w-[400px] h-[400px] rounded-2xl overflow-hidden"
          style={{
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Image
            src={makeImageUrl(productInfo.imageIds[0])}
            alt={productInfo.name}
            fill
            priority
            className="object-cover"
          />
          <div className="ml-30 w-[150px] h-[150px]  ">
            {productInfo.imageIds.map((imageId, index) => (
              <Image
                key={index}
                src={makeImageUrl(imageId)}
                alt={productInfo.name}
                width={150}
                height={150}
                className="object-cover"
              />
            ))}
          </div>
        </div>
        <div className="max-w-[600px] pt-20 ml-40 flex flex-col gap-5">
          <p className="text-2xl bg-amber-100">{productInfo.name}</p>
          <p>分類｜{categoryName}</p>
          <p>描述｜{productInfo.description}</p>
          <p>價錢｜{productInfo.price} 元</p>
          <QuantityBar productId={productInfo.id} />
        </div>
      </div>
      <RecommendList currentProductId={productInfo.id} />
    </div>
  );
}
