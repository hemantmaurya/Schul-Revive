import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import initDatabase from "./config/initDb.js";
import testingRoutes from "./routes/testing.routes.js";
import departmentRoutes from "./routes/department.route.js";
import courseRoutes from "./routes/course.route.js";
import subjectRoutes from "./routes/subject.route.js"
import houseRoutes from "./routes/house.route.js"
import classRoutes from "./routes/classSubject.route.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Initialization
initDatabase().catch(err => {
  console.error("Database initialization error:", err);
});

// Routes
app.use("/api/testing", testingRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/houses", houseRoutes);
app.use("/api/class", classRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    app: "SchulRevive Backend",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// 404 Not Found
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});