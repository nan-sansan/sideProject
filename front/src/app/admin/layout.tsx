import Sidebar from "@/app/admin/_components/Sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <main className="w-[calc(100vw-200px)] h-full ml-[20px]">{children}</main>
    </div>
  );
}
