import { create } from "zustand/react";
import { loginApi } from "@/apis/auth";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  login: (account: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  return {
    accessToken: null,
    refreshToken: null,
    login: async (account, password) => {
      const { content } = await loginApi(account, password);
      set({
        accessToken: content.accessToken,
        refreshToken: content.refreshToken,
      });
    },
    logout: () => {
      set({ accessToken: null });
    },
  };
});
