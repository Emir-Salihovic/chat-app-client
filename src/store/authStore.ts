import { create } from "zustand";
import { User } from "../types";

export interface AuthState {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;

  setLogedInUser: (user: User | null) => void;
  logedInUser: User | null;
}

const useAuthStore = create<AuthState>()((set) => ({
  authenticated: false,
  setAuthenticated: (value: boolean) => set({ authenticated: value }),

  setLogedInUser: (user: User | null) => set({ logedInUser: user }),
  logedInUser: null,
}));

export default useAuthStore;
