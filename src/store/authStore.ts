import { create } from "zustand";

export interface AuthState {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;

  setLogedInUser: (user: any) => void;
  logedInUser: any;
}

const useAuthStore = create<AuthState>()((set) => ({
  authenticated: false,
  setAuthenticated: (value: boolean) => set({ authenticated: value }),

  setLogedInUser: (user: any) => set({ logedInUser: user }),
  logedInUser: null,
}));

export default useAuthStore;
