import { Router }
from "express";
import verifyUser from "../middleware/authMiddleware.js";

import {
  RoadmapController,
} from "../controllers/roadmap.controller.js";

const router = Router();

router.post(
  "/generate",
  verifyUser,
  RoadmapController.generate
);

export default router;