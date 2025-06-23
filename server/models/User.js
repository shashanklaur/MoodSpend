const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  monthlyGoal: {
    type: Number,
    default: 0, // Default goal is 0 until the user sets one
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
