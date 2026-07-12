import { create } from "zustand";

interface AuthStore {
    access: string | null;
    refresh: string | null;
    login: (access: string, refresh: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
    access:
        typeof window !== "undefined"
            ? localStorage.getItem("access")
            : null,
    refresh:
        typeof window !== "undefined"
            ? localStorage.getItem("refresh")
            : null,

    login: (access, refresh) => {
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        set({ access, refresh });
    },

    logout: () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        set({ access: null, refresh: null });
    },

    isLoggedIn() {
        return !!localStorage.getItem("access");
    },

}));