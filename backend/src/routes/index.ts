import { Router } from "express";
import { authRouter } from "./auth.routes";
import { vehicleRouter } from "./vehicle.routes";
import { driverRouter } from "./driver.routes";
import { maintenanceRouter } from "./maintenance.routes";
import { fuelLogRouter } from "./fuelLog.routes";
import { expenseRouter } from "./expense.routes";
import { dashboardRouter } from "./dashboard.routes";
import { tripRouter } from "./trip.routes";
import { analyticsRouter } from "./analytics.routes";
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

router.use("/vehicles", vehicleRouter);
router.use("/drivers", driverRouter);
router.use("/maintenance", maintenanceRouter);
router.use("/fuel-logs", fuelLogRouter);
router.use("/expenses", expenseRouter);
router.use("/dashboard", dashboardRouter);
router.use("/analytics", analyticsRouter);
