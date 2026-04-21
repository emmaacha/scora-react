import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Organization } from "@/types";

interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Active org context
  activeOrg: Organization | null;

  // UI state
  sidebarCollapsed: boolean;
  currentScreen: string;

  // Actions
  setUser: (user: User, token: string) => void;
  logout: () => void;
  setActiveOrg: (org: Organization) => void;
  setCurrentScreen: (screen: string) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      activeOrg: null,
      sidebarCollapsed: false,
      currentScreen: "dashboard",

      setUser: (user, token) => {
        localStorage.setItem("vs_token", token);
        set({ user, token, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem("vs_token");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          activeOrg: null,
        });
      },

      setActiveOrg: (org) => set({ activeOrg: org }),

      setCurrentScreen: (screen) => set({ currentScreen: screen }),

      toggleSidebar: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    {
      name: "vs-app-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        activeOrg: state.activeOrg,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
