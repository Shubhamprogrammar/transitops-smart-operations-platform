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
} from "../controllers/driver.controller";

export const driverRouter = Router();

driverRouter.post("/", protect, authorize(["FLEET_MANAGER"]), create);
driverRouter.get("/", protect, authorize(["FLEET_MANAGER", "DRIVER", "SAFETY_OFFICER", "ANALYST"]), getAll);
driverRouter.get("/:id", protect, authorize(["FLEET_MANAGER", "DRIVER", "SAFETY_OFFICER", "ANALYST"]), getById);
driverRouter.patch("/:id", protect, authorize(["FLEET_MANAGER"]), update);
driverRouter.delete("/:id", protect, authorize(["FLEET_MANAGER"]), remove);
driverRouter.patch("/:id/status", protect, authorize(["FLEET_MANAGER"]), updateStatus);
