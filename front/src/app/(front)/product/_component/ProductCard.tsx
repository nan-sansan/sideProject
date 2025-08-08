import { Product } from "@/types/product";
import Image from "next/image";
import { makeImageUrl, makeProductUrl } from "@/utils/urlHelper";
import Link from "next/link";

type Props = {
  item: Product;
};
export default function ProductCard({ item }: Props) {
  return (
    <Link href={makeProductUrl(item.id)}>
      <div
        className="w-[200px] flex flex-col"
        style={{
          boxShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="relative w-[200px] h-[150px] bg-amber-600">
          <Image
            src={item.imageIds[0] ? makeImageUrl(item.imageIds[0]) : "/qqqq"}
            alt={item.name}
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="mt-2 bottom-0 left-5 border-l-2 border-gray-900-500 ">
          <p className="ml-3 font-bold bg">{item.name}</p>
          <p className="ml-3 text-end">${item.price}</p>
        </div>
      </div>
    </Link>
  );
}
