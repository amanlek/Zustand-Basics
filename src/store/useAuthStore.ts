import type { User } from "@/modules/Users/users";
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

interface AuthState {
  refreshToken: string | null;
  accessToken: string | null;
  user: User | null;
  rememberMe: boolean;
  login: (
    accessToken: string,
    refreshToken: string,
    user: User,
    rememberMe: boolean,
  ) => void;
  logout: () => void;
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      refreshToken: null,
      accessToken: null,
      user: null,
      rememberMe: false,
  

      login: (accessToken, refreshToken,user, rememberMe) => {
        set({ accessToken, refreshToken,user, rememberMe });
      },

      logout: () => {
        set({ refreshToken: null, accessToken: null, user: null, rememberMe: false });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);