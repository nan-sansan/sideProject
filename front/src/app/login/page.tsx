"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { loginApi } from "@/apis/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleLogin = async () => {
    setError(""); // 清除錯誤訊息

    try {
      const res = await loginApi(username, password);
      const token = res.token;
      // 儲存 JWT
      localStorage.setItem("token", token);

      toast.success("User logged in successfully!");
      router.push("/");
    } catch {
      toast.error("登入失敗");
    }
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
