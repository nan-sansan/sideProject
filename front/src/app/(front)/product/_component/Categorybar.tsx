import { Category } from "@/types/product";
import Link from "next/link";

type Props = {
  categories: Category[];
};
const makeParamsUrl = (category: string) => {
  const params = new URLSearchParams();
  params.set("category", category);
  return "/product?" + params.toString();
};

export default function CategoryBar({ categories }: Props) {
  return (
    <ul className="mx-auto flex flex-col gap-5">
      {categories.map((category, index) => {
        return (
          <Link key={index} href={makeParamsUrl(category.id)}>
            <li
              className="w-30 h-10 bg-amber-100 rounded-md p-2 cursor-pointer hover:bg-amber-200"
              style={{
                boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              {category.name}
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
