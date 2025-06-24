import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: { name: "", email: "" },
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: { name: "", email: "" } }),
    }),
    {
      name: "user-storage",
    },
  ),
);
