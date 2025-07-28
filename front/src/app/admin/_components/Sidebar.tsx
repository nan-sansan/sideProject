"use client";
import { usePathname, useRouter } from "next/navigation";

const items = [
  { title: "Project", path: "/admin" },
  { title: "Member", path: "/admin/members" },
  { title: "Order", path: "/admin/orders" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="w-[200px] h-full bg-gray-300 text-white p-4 space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={`block w-full text-left p-2 rounded ${
            pathname === item.path ? "bg-gray-600" : "hover:bg-gray-700"
          }`}
          onClick={() => {
            router.push(item.path);
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
