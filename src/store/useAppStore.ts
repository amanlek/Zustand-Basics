import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface AppState {
  count: number;
  theme: "light" | "dark";
  increment: () => void;
  decrement: () => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        count: 0,
        increment: () =>
          set((s) => ({ count: s.count + 1 }), false, "increment"),
        decrement: () =>
          set((s) => ({ count: s.count - 1 }), false, "decrement"),
        toggleTheme: () =>
          set(
            (state) => ({
              theme: state.theme === "light" ? "dark" : "light",
            }),
            false,
            "toggleTheme",
          ),
      }),
      {
        name: "app-storage", // name of the item in storage
        storage: createJSONStorage(() => localStorage), 
      },
    ),
  ),
);
