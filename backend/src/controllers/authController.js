const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateRefreshToken } = require("../utils/authUtils");

async function register(req, res) {
  try {
    const { fullName, email, password } = req.body;

    // 1️⃣ Validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "fullName, email, and password are required",
      });
    }

    // 2️⃣ Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 3️⃣ Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    await User.create({
      fullName,
      email,
      passwordHash,
      isActive: true,
    });

    // 5️⃣ Success response (NO TOKEN)
    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please log in.",
    });
  } catch (error) {
    console.error("Register error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    // 3️⃣ Check user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "User is not active",
      });
    }

    // 4️⃣ Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 5️⃣ Generate JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // payload
      process.env.JWT_SECRET, // secret
      { expiresIn: "1h" } // options
    );

    // Add Refresh Token
    const refreshToken = generateRefreshToken();
    user.refreshToken = refreshToken;
    // Store in database upon login
    await user.save();

    // 6️⃣ Success response with token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      refreshToken,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
}

async function refreshToken(req, res) {
  try {
    // Implementation for refreshing JWT using refresh token
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token required",
      });
    }
    // Check if refresh token is valid
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    // Generate new JWT and return it
    const newToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      success: true,
      message: "Refresh token successful",
      token: newToken,
    });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
}

module.exports = { register, login, refreshToken };
