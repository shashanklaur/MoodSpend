const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware to check token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

router.post("/register", register);
router.post("/login", login);

// Get current user's goal
router.get("/goal", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("monthlyGoal");
    res.json({ monthlyGoal: user.monthlyGoal });
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve goal" });
  }
});

// Set/update user's goal
router.put("/goal", verifyToken, async (req, res) => {
  try {
    const { monthlyGoal } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { monthlyGoal },
      { new: true }
    ).select("monthlyGoal");
    res.json({ monthlyGoal: user.monthlyGoal });
  } catch (err) {
    res.status(500).json({ message: "Failed to update goal" });
  }
});

module.exports = router;
