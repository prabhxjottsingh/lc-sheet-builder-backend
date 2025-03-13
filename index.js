import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import chalk from "chalk";
import connectDb from "./utils/connectDB.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.options("*", cors());
app.use(bodyParser.json());

// Request Logging Middleware
app.use((req, res, next) => {
  const startTime = Date.now();
  res.on("finish", () => {
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    console.log(
      chalk.blue(`[API Log]`),
      chalk.yellow(`Method: ${req.method}`),
      chalk.green(`Endpoint: ${req.originalUrl}`),
      chalk.cyan(`Time Taken: ${timeTaken}ms`)
    );
  });
  next();
});

// Global middleware for all routes
app.use((req, res, next) => {
  // Set CORS headers for all responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

// Routes
import authRoutes from "./routes/authRoutes.js";
import sheetRoutes from "./routes/sheetRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import userRoutes from "./routes/userRoutes.js";
app.use("/api/auth", authRoutes);
app.use("/api/sheet", sheetRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "abcdefghijklmnop";
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Hello World" });
});
app.get("/api/test", (req, res) => {
  res.json({ message: "Hello World" });
});
app.post("/api/postData", (req, res) => {
  res.json({ message: "POST successful" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something broke!",
    message: err.message,
  });
});

let isDbConnected = false;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, async () => {
    await connectDb();
    console.log(chalk.green(`Server running on port ${PORT}`));
  });
}

export default async function handler(req, res) {
  if (!isDbConnected) {
    try {
      await connectDb();
      isDbConnected = true;
    } catch (error) {
      console.error("MongoDB connection error:", error);
      return res.status(500).json({ error: "Database connection failed" });
    }
  }

  return app(req, res);
}
