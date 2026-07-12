import { Router } from "express";
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/rbac";
import {
  createTripHandler,
  getAllTripsHandler,
  getTripByIdHandler,
  updateTripStatusHandler,
} from "../controllers/trip.controller";

export const tripRouter = Router();

tripRouter.get("/", protect, authorize(["FLEET_MANAGER", "DRIVER", "SAFETY_OFFICER", "ANALYST"]), getAllTripsHandler);
tripRouter.get("/:id", protect, authorize(["FLEET_MANAGER", "DRIVER", "SAFETY_OFFICER", "ANALYST"]), getTripByIdHandler);
tripRouter.post("/", protect, authorize(["FLEET_MANAGER"]), createTripHandler);
tripRouter.patch("/:id/status", protect, authorize(["FLEET_MANAGER"]), updateTripStatusHandler);
