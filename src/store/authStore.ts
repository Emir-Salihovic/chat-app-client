import { create } from "zustand";
import { User } from "../services/authService";

export interface AuthState {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;

  setLogedInUser: (user: any) => void;
  logedInUser: User | null;
}

const useAuthStore = create<AuthState>()((set) => ({
  authenticated: false,
  setAuthenticated: (value: boolean) => set({ authenticated: value }),

  setLogedInUser: (user: any) => set({ logedInUser: user }),
  logedInUser: null,
}));

export default useAuthStore;
