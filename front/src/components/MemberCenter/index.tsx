"use client";

import { useUserInfo } from "@/hooks/useUserInfo";
import Link from "next/link";
import Image from "next/image";

export default function MemberCenter() {
  const { role } = useUserInfo();
  if (!role) return <Link href="/login">未登入</Link>;
  if (role === "ADMIN") {
    return (
      <Link href="/admin">
        <Image src="/assest/member.png" alt="會員中心" width={24} height={24} />
      </Link>
    );
  }
  return (
    <Link href="/member">
      <Image src="/assest/member.png" alt="會員中心" width={24} height={24} />
    </Link>
  );
}
