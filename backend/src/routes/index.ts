import { Router } from "express";
import { authRouter } from "./auth.routes";
import { tripRouter } from "./trip.routes";
import { protect } from "../middleware/auth";

export const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/auth", authRouter);
router.use("/trips", tripRouter);

router.get("/me", protect, (req, res) => {
  res.json({ user: req.user ?? null });
});
