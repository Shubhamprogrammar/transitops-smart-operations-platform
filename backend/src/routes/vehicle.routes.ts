import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
import {
  create,
  getAll,
  getById,
  update,
  remove,
  updateStatus,
} from "../controllers/vehicle.controller";

export const vehicleRouter = Router();

vehicleRouter.post("/", protect, authorize(["FLEET_MANAGER"]), create);
vehicleRouter.get("/", protect, getAll);
vehicleRouter.get("/:id", protect, getById);
vehicleRouter.patch("/:id", protect, authorize(["FLEET_MANAGER"]), update);
vehicleRouter.delete("/:id", protect, authorize(["FLEET_MANAGER"]), remove);
vehicleRouter.patch("/:id/status", protect, authorize(["FLEET_MANAGER"]), updateStatus);
