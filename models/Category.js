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
        ref: "Problem",
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Category = mongoose.model("Category", categorySchema);
