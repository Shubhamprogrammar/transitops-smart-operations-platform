import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
import {
  getSummary,
  getVehicleStatus,
  getTripStatus,
  getExpenses,
  getFuel,
} from "../controllers/dashboard.controller";

export const dashboardRouter = Router();

dashboardRouter.get("/summary", protect, getSummary);
dashboardRouter.get("/vehicle-status", protect, getVehicleStatus);
dashboardRouter.get("/trip-status", protect, getTripStatus);
dashboardRouter.get("/expenses", protect, getExpenses);
dashboardRouter.get("/fuel", protect, getFuel);
