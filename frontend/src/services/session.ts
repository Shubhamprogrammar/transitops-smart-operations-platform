import { tokenStore } from "./tokenStore";

export const session = {
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!tokenStore.getToken();
  },
  signOut: (): void => {
    tokenStore.removeToken();
  },
};
