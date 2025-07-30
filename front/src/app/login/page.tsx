"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { jwtDecode } from "jwt-decode";
import { useUserInfo } from "@/hooks/useUserInfo";

export default function LoginPage() {
  const { login } = useAuthStore();
  const userInfo = useUserInfo();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();
  useEffect(() => {
    if (!userInfo) return;
    switch (userInfo.role) {
      case "ADMIN":
        router.push("/admin");
        break;
      case "MEMBER":
        router.push("/member");
        break;
      default:
    }
  }, [userInfo, router]);

  const handleLogin = async () => {
    setError(""); // 清除錯誤訊息
    await login(username, password);
  };
  return (
    <div className="mx-auto h-[100vh] items-center justify-center w-[30vw] overflow-hidden] flex flex-col gap-5">
      <Input
        type={"text"}
        id="acc"
        placeholder={"請輸入帳號"}
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <Input
        type={"password"}
        id="pwd"
        placeholder={"輸入密碼"}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        type={"submit"}
        onClick={() => {
          handleLogin();
          console.log(username);
          console.log(password);
        }}
      >
        登入
      </Button>
      {error && <div className="text-red-500 font-semibold">{error}</div>}
    </div>
  );
}
