import { Router } from "express";
import { protect } from "../middleware/auth";
import { authorize } from "../middleware/rbac";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/expense.controller";

export const expenseRouter = Router();

expenseRouter.post("/", protect, authorize(["FLEET_MANAGER"]), create);
expenseRouter.get("/", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER", "ANALYST"]), getAll);
expenseRouter.get("/:id", protect, authorize(["FLEET_MANAGER", "SAFETY_OFFICER", "ANALYST"]), getById);
expenseRouter.patch("/:id", protect, authorize(["FLEET_MANAGER"]), update);
expenseRouter.delete("/:id", protect, authorize(["FLEET_MANAGER"]), remove);
