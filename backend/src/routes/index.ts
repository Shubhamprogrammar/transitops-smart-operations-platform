import { Router } from "express";
import { authRouter } from "./auth.routes";
import { AuthenticatedRequest, requireAuth } from "../middleware/auth";

export const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/auth", authRouter);

router.get("/me", requireAuth, (req, res) => {
  const authReq = req as AuthenticatedRequest;
  res.json({ user: authReq.user ?? null });
});
