import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../helpers/response";
import { getAnalyticsData } from "../services/analytics.service";

export const getAnalytics = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await getAnalyticsData();
    sendSuccess(res, data, "Analytics data fetched successfully");
  } catch (error) {
    next(error);
  }
};
