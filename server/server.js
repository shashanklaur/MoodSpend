const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const entryRoutes = require("./routes/entryRoutes"); //  Added new route
app.use("/api/auth", authRoutes);
app.use("/api/entries", entryRoutes); //  Mounted new route

// Root route
app.get("/", (req, res) => {
  res.send("MoodSpend backend is running 🎉");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
