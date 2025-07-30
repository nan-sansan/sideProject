"use client";

import { useAuthStore } from "@/stores/authStore";
import { useMemo } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";

type Role = {
  role: string;
};
type UserInfo = {
  userId: string;
  role: string;
};

const ghost = { userId: "", role: "" };
export const useUserInfo = (): UserInfo => {
  const { accessToken } = useAuthStore();
  return useMemo(() => {
    if (!accessToken) return ghost;
    try {
      const rawInfo = jwtDecode<JwtPayload & Role>(accessToken);
      return {
        userId: rawInfo.sub!,
        role: rawInfo.role,
      };
    } catch {
      console.warn("warring: invalid token");
      return ghost;
    }
  }, [accessToken]);
};
