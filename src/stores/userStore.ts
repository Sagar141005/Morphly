import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  name?: string;
  profilePic?: string;
  plan: "FREE" | "PLUS" | "PRO";
  basicCredits: number;
  aiCredits: number;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  updatePlan: (plan: "FREE" | "PLUS" | "PRO") => void;
  updateCredits: (basicCredits: number, aiCredits: number) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updatePlan: (plan) =>
    set((state) => ({
      user: state.user ? { ...state.user, plan } : null,
    })),
  updateCredits: (basicCredits, aiCredits) =>
    set((state) => ({
      user: state.user ? { ...state.user, basicCredits, aiCredits } : null,
    })),
  clearUser: () => set({ user: null }),
}));
