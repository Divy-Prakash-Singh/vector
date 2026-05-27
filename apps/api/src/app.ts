import "dotenv/config";

import express from "express";
import cors from "cors";
import authRoutes from "./routes/userRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import dailytaskRoutes from "./routes/dailytask.routes.js";

const app = express();


// Middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/dailytask", dailytaskRoutes);
// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
