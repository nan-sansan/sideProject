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
    <ul>
      {categories.map((category, index) => {
        return (
          <li key={index}>
            <Link href={makeParamsUrl(category.id)}>{category.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}
