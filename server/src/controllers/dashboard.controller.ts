import { Request, Response } from "express";
import {
  getDashboardStats
} from "../services/dashboard.service";

export const getStats =
  async (
    req: Request,
    res: Response
  ) => {

    const stats =
      await getDashboardStats();

    res.json({
      success: true,
      data: stats,
    });
  };
