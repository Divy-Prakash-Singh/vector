import { Router } from "express";

import { getDashboard } from "../controllers/dashboard.controller.js";

import verifyUser from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", verifyUser, getDashboard);

export default router;