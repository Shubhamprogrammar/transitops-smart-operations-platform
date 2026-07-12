import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
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
driverRouter.get("/", protect, getAll);
driverRouter.get("/:id", protect, getById);
driverRouter.patch("/:id", protect, authorize(["FLEET_MANAGER"]), update);
driverRouter.delete("/:id", protect, authorize(["FLEET_MANAGER"]), remove);
driverRouter.patch("/:id/status", protect, authorize(["FLEET_MANAGER"]), updateStatus);
