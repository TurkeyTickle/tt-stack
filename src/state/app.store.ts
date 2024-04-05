import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      drawerOpen: true,
      toggleDrawer: () => set({ drawerOpen: !get().drawerOpen }),
    }),
    {
      name: "app",
    },
  ),
);
