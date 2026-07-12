import { useMutation } from "@tanstack/react-query";
import type { LoginPayload, LoginResponse } from "@/types/api";
import { login } from "../services/auth.service";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
  });
}
