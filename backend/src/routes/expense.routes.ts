import { Router } from "express";
import { protect, authorize } from "../middleware/auth";
import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/expense.controller";

export const expenseRouter = Router();

expenseRouter.post("/", protect, authorize(["FLEET_MANAGER"]), create);
expenseRouter.get("/", protect, getAll);
expenseRouter.get("/:id", protect, getById);
expenseRouter.patch("/:id", protect, authorize(["FLEET_MANAGER"]), update);
expenseRouter.delete("/:id", protect, authorize(["FLEET_MANAGER"]), remove);
