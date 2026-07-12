import { Router } from "express";
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/rbac";
import { createTripHandler } from "../controllers/trip.controller";

export const tripRouter = Router();

tripRouter.post("/", protect, authorize(["FLEET_MANAGER"]), createTripHandler);
