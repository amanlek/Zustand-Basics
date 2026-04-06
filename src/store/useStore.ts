import { create } from "zustand";

interface AppState {
  count: number;
  theme: "light" | "dark";
    userName: string;
    increment: () => void;
  decrement: () => void;
  toggleTheme: () => void;
  setUserName: (name: string) => void;
}

export const useStore = create<AppState>((set) => ({
  theme: "light",
  userName: "User",
count: 0,
increment: () => set((s) => ({ count: s.count + 1 })),
decrement: () => set((s) => ({ count: s.count - 1 })),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
  setUserName: (name) => set({ userName: name }),
}));
