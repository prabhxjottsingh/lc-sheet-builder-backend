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
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, async () => {
  await connectDb();
  console.log(chalk.green(`Server running on port ${PORT}`));
});

// Graceful shutdown for production-level handling
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
