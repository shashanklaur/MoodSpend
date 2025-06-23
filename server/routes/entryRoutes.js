const express = require("express");
const router = express.Router();
const Entry = require("../models/Entry");
const jwt = require("jsonwebtoken");

// Middleware to check user token
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

// Create a new entry
router.post("/", verifyToken, async (req, res) => {
  try {
    console.log("🔐 Authenticated User ID:", req.user.id);
    console.log("📦 Request Body:", req.body);

    const newEntry = new Entry({ ...req.body, user: req.user.id });
    const saved = await newEntry.save();

    console.log("✅ Entry Saved:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Entry Creation Error:", err.message);
    res.status(500).json({ message: "Failed to create entry" });
  }
});

// Get all entries for logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch entries" });
  }
});

// Update an entry
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Entry.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update entry" });
  }
});

// Delete an entry
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Entry.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Entry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete entry" });
  }
});

module.exports = router;

