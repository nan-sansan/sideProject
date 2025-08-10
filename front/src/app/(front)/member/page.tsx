"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getUserApi, updateUserApi } from "@/apis/user";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MemberPage() {
  const { userId } = useUserInfo();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getUserInfo = async () => {
      const { content: userInfo } = await getUserApi(userId);
      setUser(userInfo);
    };
    if (!userId) return;
    void getUserInfo();
  }, [userId]);

  const updateUser = async () => {
    try {
      await updateUserApi(user!);
      toast.success("更新成功");
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    }
  };

  if (!user) return <div>loading</div>;

  return (
    <div className="m-10 flex flex-col gap-5 w-[30vw] ">
      <div className="flex  justify-between">
        <Label>會員帳號</Label>
        <div className="max-w-[70%] text-start ">{user.account}</div>
      </div>
      <div className="flex justify-between">
        <Label>電子郵件</Label>
        <div className="max-w-[70%]">{user.email}</div>
      </div>
      <div className="flex justify-between">
        <Label htmlFor="birthday">會員生日</Label>
        <Input
          value={user!.birthday}
          id="birthday"
          type="date"
          className="max-w-[70%]"
          onChange={(e) => {
            setUser({ ...user!, birthday: e.target.value });
          }}
        />
      </div>
      <div className="flex justify-between">
        <Label htmlFor="nickname">會員暱稱</Label>
        <Input
          onChange={(e) => {
            setUser({ ...user!, nickname: e.target.value });
          }}
          value={user!.nickname}
          id="nickname"
          type="text"
          className="max-w-[70%]"
        />
      </div>
      <Button onClick={updateUser}>儲存</Button>
    </div>
  );
}
