import { Product } from "@/types/product";
import Image from "next/image";
import { makeImageUrl } from "@/utils/imageHelper";

type Props = {
  item: Product;
};
export default function ProductCard({ item }: Props) {
  return (
    <div className="w-[200px] flex flex-col bg-amber-300">
      <div className="relative w-[200px] h-[150px] bg-amber-600">
        <Image
          src={item.imageIds[0] ? makeImageUrl(item.imageIds[0]) : "/qqqq"}
          alt={item.name}
          fill
          priority
          className="object-cover" // 根據需求可改成 object-contain
        />
      </div>
      <div className="mt-2 bottom-0 left-5 border-l-2 border-amber-100 ">
        <p className="ml-3 font-bold bg">{item.name}</p>
        <p className="ml-3">{item.description}</p>
        <p className="ml-3 text-end">${item.price}</p>
      </div>
    </div>
  );
}
