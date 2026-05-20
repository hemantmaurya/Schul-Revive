// backend/src/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import initDatabase from "./config/initDb.js";
import testingRoutes from "./routes/testing.routes.js";
import academicRoutes from "./routes/academic.routes.js";
import testRoutes from './routes/testRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use("/api/testing", testingRoutes);
app.use("/api/academic", academicRoutes);
app.use('/api/tests', testRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    app: "SchulRevive Backend",
    uploads: "/uploads"
  });
});

app.get("/", (req, res) => {
  res.json({ message: "✅ SchulRevive Backend is Running" });
});

const startServer = async () => {
  try {
    await initDatabase();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📁 Images available at http://localhost:${PORT}/uploads`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
};

startServer();