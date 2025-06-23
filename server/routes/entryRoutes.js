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

// ✅ Get single entry by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, user: req.user.id });
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    res.json(entry);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch entry" });
  }
});

// Create a new entry
router.post("/", verifyToken, async (req, res) => {
  try {
    const newEntry = new Entry({ ...req.body, user: req.user.id });
    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
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
