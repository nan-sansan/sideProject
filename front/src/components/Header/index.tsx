"use client";
import Image from "next/image";
import Link from "next/link";
import MemberCenter from "@/components/MemberCenter";
import { useUserInfo } from "@/hooks/useUserInfo";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
export default function Header() {
  const { role } = useUserInfo();
  const { logout } = useAuthStore();
  return (
    <>
      <header className="bg-[var(--main-color)] fixed top-0 w-full z-999">
        <nav className="flex items-center justify-around">
          <div className="nav-logo relative aspect-[3/1] w-[150px]">
            <Image
              src="/assest/logo.png"
              alt="LOGO"
              fill
              sizes="150px"
              className="object-contain"
              priority
            />
          </div>
          <ul className="flex gap-7 items-baseline">
            <li>
              <Link href="allNEWS.html">全部消息</Link>
            </li>
            <li>
              <Link href="/about">關於我們</Link>
            </li>
            <li>
              <Link href="/product">所有商品</Link>
            </li>
            <li>
              <Link href="FAQ.html">FAQ</Link>
            </li>
          </ul>
          <div className="member-area flex gap-5">
            <div className="nav-cart">
              <Link href="/cart">
                <Image
                  src="/assest/cart.png"
                  alt="購物車"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
            <div className="nav-user">
              <MemberCenter />
            </div>
            {role != "" ? (
              <Button
                variant="destructive"
                onClick={() => {
                  logout();
                }}
              >
                登出
              </Button>
            ) : (
              <></>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
