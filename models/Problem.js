import mongoose from "mongoose";

// Problem Schema
const problemSchema = new mongoose.Schema({
  lcproblemId: {
    type: String,
    required: true,
  },
  isMarkedDone: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Problem = mongoose.model("Problem", problemSchema);
