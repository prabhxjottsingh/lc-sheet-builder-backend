import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  metadata: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isUserGenerated: {
      type: Boolean,
    },
    color: {
      type: String,
    },
  },
    data: {
  problemIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem", // Reference to the Problem model
    },
  ],
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional: You can add any pre-save hooks or methods if needed.

export const Category = mongoose.model("Category", categorySchema);
