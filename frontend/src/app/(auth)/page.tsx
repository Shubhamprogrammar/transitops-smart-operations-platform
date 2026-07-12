"use client";

import { useState } from "react";
import { LoginForm } from "@/modules/auth/components/login-form";
import { RegisterForm } from "@/modules/auth/components/register-form";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  if (mode === "register") {
    return <RegisterForm onSwitchToLogin={() => setMode("login")} />;
  }

  return <LoginForm onSwitchToRegister={() => setMode("register")} />;
}
