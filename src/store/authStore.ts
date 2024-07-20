import { create } from "zustand";

export interface AuthState {
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;

  logedInUser: any;
}

const useAuthStore = create<AuthState>()((set) => ({
  authenticated: false,
  setAuthenticated: (value: boolean) => set({ authenticated: value }),

  logedInUser: null,
}));

export default useAuthStore;
