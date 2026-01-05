require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const app = express();
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 4000;

// Connect to Database
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });
