import { Router } from "express";
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/rbac";
import {
  createTripHandler,
  dispatchTripHandler,
  completeTripHandler,
  cancelTripHandler,
  getAllTripsHandler,
  getTripByIdHandler,
} from "../controllers/trip.controller";

export const tripRouter = Router();

// All routes require authentication
tripRouter.use(protect);

// Create
tripRouter.post("/", authorize(["FLEET_MANAGER"]), createTripHandler);

// Read
tripRouter.get("/", authorize(["FLEET_MANAGER", "ANALYST"]), getAllTripsHandler);
tripRouter.get("/:id", authorize(["FLEET_MANAGER", "ANALYST"]), getTripByIdHandler);

// Update (State transitions)
tripRouter.patch("/:id/dispatch", authorize(["FLEET_MANAGER"]), dispatchTripHandler);
tripRouter.patch("/:id/complete", authorize(["FLEET_MANAGER"]), completeTripHandler);
tripRouter.patch("/:id/cancel", authorize(["FLEET_MANAGER"]), cancelTripHandler);
