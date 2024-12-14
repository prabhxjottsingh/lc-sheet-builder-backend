import mongoose from "mongoose";

// Problem Schema
const problemSchema = new mongoose.Schema({
  lcproblemId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

export const Problem = mongoose.model("Problem", problemSchema);
