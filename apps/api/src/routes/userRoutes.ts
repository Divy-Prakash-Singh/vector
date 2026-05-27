import express from "express";
import verifyUser from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/userControllers.js";

const router = express.Router();

router.get("/profile", verifyUser, getProfile);

export default router;