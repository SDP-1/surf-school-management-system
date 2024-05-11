// Assuming you have already configured your Express app and set up routes

const express = require("express");
const router = express.Router();
const session = require("express-session");
const User = require("../models/User");

// Authentication middleware
const authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password }).exec();
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Store user information in session
    req.session.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Route to authenticate user and create session
router.post("/login", authenticateUser, (req, res) => {
  // Session is created, send a success response
  res.status(200).json({ message: "Login successful", user: req.session.user });
});

// Configure express-session middleware
router.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    // You can configure additional options like store, cookie, etc.
  })
);

// Route to logout and destroy session
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
});

module.exports = router;
