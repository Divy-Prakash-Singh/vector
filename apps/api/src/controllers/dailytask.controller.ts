import { Request, Response } from "express";

import { dailyTaskService } from "../services/dashboard/dailytask.service.js";

export const completeDailyTask =
  async (
    req: Request,
    res: Response,
  ) => {
    try {
      const userId = req.user.id;

      const taskId = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

      const result =
        await dailyTaskService.completeDailyTask(
          taskId,
          userId,
        );

      res.json(result);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        error:
          "Failed to complete daily task",
      });
    }
  };