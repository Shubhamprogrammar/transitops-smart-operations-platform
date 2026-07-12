import { apiClient } from "@/services/axios";
import { tokenStore } from "@/services/tokenStore";
import type { ApiResponse, LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "@/types/api";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);

  // Backend returns { message, token, user: { id: number, email, role } }
  // Frontend expects { token, user: { id: string, email, role, name } }
  const response: LoginResponse = {
    token: data.token,
    user: {
      id: String(data.user.id),
      email: data.user.email,
      role: data.user.role,
      name: data.user.email.split("@")[0] || "User",
    },
  };

  tokenStore.setToken(response.token);
  return response;
}

export async function register(payload: RegisterPayload): Promise<RegisterResponse> {
  const { data } = await apiClient.post<RegisterResponse>("/auth/register", payload);

  const response: RegisterResponse = {
    message: data.message,
    token: data.token,
    user: {
      id: String(data.user.id),
      email: data.user.email,
      role: data.user.role,
      name: data.user.email.split("@")[0] || "User",
    },
  };

  tokenStore.setToken(response.token);
  return response;
}

export async function getCurrentUser() {
  const { data } = await apiClient.get<{ user: { id: number; email: string; role: string } }>(
    "/me",
  );
  return data.user;
}
