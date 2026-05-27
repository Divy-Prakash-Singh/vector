

import { Router } from "express";


import verifyUser from "../middleware/authMiddleware.js";
import { completeDailyTask } from "../controllers/dailytask.controller.js";

const router = Router();

router.post(
  "/:id/complete",
  verifyUser,
  completeDailyTask,
);

export default router;

