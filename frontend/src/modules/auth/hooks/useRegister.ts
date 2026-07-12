import { useMutation } from "@tanstack/react-query";
import type { RegisterPayload, RegisterResponse } from "@/types/api";
import { register } from "../services/auth.service";

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: register,
  });
}
