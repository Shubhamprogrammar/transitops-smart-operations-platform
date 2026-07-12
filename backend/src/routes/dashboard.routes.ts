import { Router } from "express";
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/rbac";
import {
  getSummary,
  getVehicleStatus,
  getTripStatus,
  getExpenses,
  getFuel,
} from "../controllers/dashboard.controller";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER", "ANALYST"]), getSummary);
dashboardRouter.get("/vehicle-status", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER", "ANALYST"]), getVehicleStatus);
dashboardRouter.get("/trip-status", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER", "ANALYST"]), getTripStatus);
dashboardRouter.get("/expenses", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER", "ANALYST"]), getExpenses);
dashboardRouter.get("/fuel", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER", "ANALYST"]), getFuel);
