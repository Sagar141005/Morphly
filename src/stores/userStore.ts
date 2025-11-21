import { create } from "zustand";

interface UserState {
  plan: "free" | "plus" | "pro";
  setPlan: (plan: "free" | "plus" | "pro") => void;
}

export const useUserStore = create<UserState>((set) => ({
  plan: "free",
  setPlan: (plan) => set({ plan }),
}));
