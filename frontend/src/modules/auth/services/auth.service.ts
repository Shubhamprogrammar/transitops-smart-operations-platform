import { tokenStore } from "@/services/tokenStore";
import type { LoginPayload, LoginResponse } from "@/types/api";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  // TODO: Replace with real API call once backend is ready.
  // const { data } = await apiClient.post<ApiResponse<LoginResponse>>("/auth/login", payload);
  // tokenStore.setToken(data.data.token);
  // return data.data;

  await new Promise((resolve) => setTimeout(resolve, 600));

  // Demo error state for the design.
  if (payload.password.toLowerCase() === "wrong") {
    throw new Error("Invalid credentials. Account locked after 5 failed attempts.");
  }

  const response: LoginResponse = {
    token: "demo-token",
    user: {
      id: "1",
      email: payload.email,
      role: payload.role,
      name: "Ravija K.",
    },
  };

  tokenStore.setToken(response.token);
  return response;
}
