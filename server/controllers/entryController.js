const Entry = require("../models/Entry");

exports.addEntry = async (req, res) => {
  try {
    const { amount, mood } = req.body;
    const userId = req.user.id;

    const newEntry = new Entry({ amount, mood, user: userId });
    await newEntry.save();

    res.status(201).json(newEntry);
  } catch (err) {
    console.error("❌ Add Entry Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await Entry.find({ user: userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error("❌ Get Entries Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
