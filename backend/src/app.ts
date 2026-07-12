import express from "express";
import cors from "cors";
import { router } from "./routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message });
  },
);



