import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/fuelLog.controller";

export const fuelLogRouter = Router();

fuelLogRouter.post("/", protect, authorize(["FLEET_MANAGER"]), create);
fuelLogRouter.get("/", protect, getAll);
fuelLogRouter.get("/:id", protect, getById);
fuelLogRouter.patch("/:id", protect, authorize(["FLEET_MANAGER"]), update);
fuelLogRouter.delete("/:id", protect, authorize(["FLEET_MANAGER"]), remove);
