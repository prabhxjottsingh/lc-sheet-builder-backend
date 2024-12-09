import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    // minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// convert email address to lowercase before insertions
userSchema.pre("save", function (next) {
  this.email = this.email.toLowerCase();
  next();
});

export const User = mongoose.model("User", userSchema);
