import { Router } from "express";
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/rbac";
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
vehicleRouter.get("/", protect, authorize(["FLEET_MANAGER", "DRIVER", "SAFETY_OFFICER", "ANALYST"]), getAll);
vehicleRouter.get("/:id", protect, authorize(["FLEET_MANAGER", "DRIVER", "SAFETY_OFFICER", "ANALYST"]), getById);
vehicleRouter.patch("/:id", protect, authorize(["FLEET_MANAGER"]), update);
vehicleRouter.delete("/:id", protect, authorize(["FLEET_MANAGER"]), remove);
vehicleRouter.patch("/:id/status", protect, authorize(["FLEET_MANAGER"]), updateStatus);
