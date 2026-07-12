import { Router } from "express";
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/rbac";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/fuelLog.controller";

export const fuelLogRouter = Router();

fuelLogRouter.post("/", protect, authorize(["FLEET_MANAGER"]), create);
fuelLogRouter.get("/", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER", "ANALYST"]), getAll);
fuelLogRouter.get("/:id", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER", "ANALYST"]), getById);
fuelLogRouter.patch("/:id", protect, authorize(["FLEET_MANAGER"]), update);
fuelLogRouter.delete("/:id", protect, authorize(["FLEET_MANAGER"]), remove);
