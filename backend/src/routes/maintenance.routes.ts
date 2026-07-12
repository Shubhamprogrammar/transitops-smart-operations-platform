import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
import {
  create,
  getAll,
  getById,
  update,
  remove,
  complete,
} from "../controllers/maintenance.controller";

export const maintenanceRouter = Router();

maintenanceRouter.post("/", protect, authorize(["FLEET_MANAGER"]), create);
maintenanceRouter.get("/", protect, getAll);
maintenanceRouter.get("/:id", protect, getById);
maintenanceRouter.patch("/:id", protect, authorize(["FLEET_MANAGER"]), update);
maintenanceRouter.delete("/:id", protect, authorize(["FLEET_MANAGER"]), remove);
maintenanceRouter.patch("/:id/complete", protect, authorize(["FLEET_MANAGER"]), complete);
