import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import chalk from "chalk";
import connectDb from "./utils/connectDB.js";

// Load environment variables
dotenv.config();

// Initialize app and database
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
import sheetRoutes from "./routes/sheetRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
app.use("/api/auth", authRoutes);
app.use("/api/sheets", sheetRoutes);
app.use("/api/category", categoryRoutes);

const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET || "abcdefghijklmnop";
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";

// Start the server
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
