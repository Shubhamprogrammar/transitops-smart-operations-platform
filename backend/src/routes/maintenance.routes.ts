import { Router } from "express";
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/rbac";
import {
  create,
  getAll,
  getById,
  update,
  remove,
  complete,
} from "../controllers/maintenance.controller";

export const maintenanceRouter = Router();

maintenanceRouter.post("/", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER"]), create);
maintenanceRouter.get("/", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER", "ANALYST"]), getAll);
maintenanceRouter.get("/:id", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER", "ANALYST"]), getById);
maintenanceRouter.patch("/:id", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER"]), update);
maintenanceRouter.delete("/:id", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER"]), remove);
maintenanceRouter.patch("/:id/complete", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER"]), complete);
