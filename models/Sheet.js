import mongoose from "mongoose";

// Sheet Schema
const sheetSchema = new mongoose.Schema({
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  data: {
    categoryIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // Reference to the Category model
      },
    ],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Sheet = mongoose.model("Sheet", sheetSchema);
