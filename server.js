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
app.use(cors());
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

// Routes
import authRoutes from "./routes/authRoutes.js";
import sheetRoutes from "./routes/sheetRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
app.use("/api/auth", authRoutes);
app.use("/api/sheet", sheetRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/problem", problemRoutes);

const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "abcdefghijklmnop";
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

app.listen(PORT, async () => {
  await connectDb();
  console.log(chalk.green(`Server running on port ${PORT}`));
});

process.on("SIGINT", () => {
  console.log(chalk.yellow("Shutting down server..."));
  mongoose.connection.close(() => {
    console.log(chalk.green("MongoDB connection closed"));
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log(chalk.yellow("Received SIGTERM. Shutting down server..."));
  mongoose.connection.close(() => {
    console.log(chalk.green("MongoDB connection closed"));
    process.exit(0);
  });
});
