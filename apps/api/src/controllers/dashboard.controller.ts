import { Request, Response } from "express";
import { dashboardService } from "../services/dashboard/dashboard.service.js";

export const getDashboard = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.user.id;

    const dashboard =
      await dashboardService.getDashboard(userId);

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard",
    });
  }
};