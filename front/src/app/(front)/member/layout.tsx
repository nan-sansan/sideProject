import type { Metadata } from "next";
import MemberSideBar from "@/app/(front)/member/_component/MemberSideBar";

export const metadata: Metadata = {
  title: "會員中心",
  description: "會員個人中心",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex mt-[50px]">
      <MemberSideBar />
      {children}
    </div>
  );
}
