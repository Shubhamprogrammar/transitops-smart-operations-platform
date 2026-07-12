import { Router } from "express";
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/rbac";
import { getAnalytics } from "../controllers/analytics.controller";

export const analyticsRouter = Router();

analyticsRouter.get(
  "/",
  protect,
  authorize(["FLEET_MANAGER", "ANALYST"]),
  getAnalytics,
);
