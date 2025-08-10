import Link from "next/link";

const items = [
  { title: "Member", path: "/member" },
  { title: "Order", path: "/member/order" },
];

export default function MemberSideBar() {
  return (
    <div className="w-[15vw] h-[calc(100vh-50px)] bg-amber-50">
      <ul>
        {items.map((item, index) => (
          <Link key={index} href={item.path}>
            <li className="hover:bg-amber-100 hover:cursor-pointer border-b h-10 p-2 hover:[box-shadow:1px_1px_1px_rgba(0,0,0,0.2)]">
              {item.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
