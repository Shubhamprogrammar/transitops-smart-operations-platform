import { env } from "@/config/env";
import { ApiError } from "@/lib/errors/api-error";
import axios from "axios";
import { tokenStore } from "./tokenStore";

export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = tokenStore.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message =
        (error.response?.data as { message?: string })?.message ??
        error.message;
      const status = error.response?.status ?? 500;
      const code = (error.response?.data as { code?: string })?.code;
      return Promise.reject(new ApiError(message, status, code));
    }
    return Promise.reject(error);
  }
);
