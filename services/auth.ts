// services/auth.ts
import api from "./api";
import { LoginRequest, LoginResponse } from "@/types/auth";

export const login = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post(
        "/accounts/login/",
        data
    );

    const { access, refresh } = response.data;
    
    // Store tokens in localStorage
    if (access && refresh) {
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        console.log("✅ Tokens stored successfully");
    } else {
        console.warn("⚠️ No tokens received from login response");
    }

    return response.data;
};

// Add logout function
export const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    console.log("🔓 Logged out, tokens removed");
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem("access");
    return !!token;
};

// Get the current token
export const getAccessToken = (): string | null => {
    return localStorage.getItem("access");
};