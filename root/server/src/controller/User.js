const express = require("express");
const router = express.Router();
const User = require("../models/User");

module.exports.createUser = async function (req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUsers = async function (req, res) {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUserById = async function (req, res) {
  try {
    const user = await User.findById(req.params.id).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.updateUser = async function (req, res) {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.deleteUser = async function (req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(204).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getUserByUsernameAndPassword = async function (req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({
      userName: username,
      password: password,
    }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Assuming you have a function to verify user credentials
const authenticateUser = (username, password) => {
  // Logic to verify username and password against your database
  // Return true if authentication succeeds, false otherwise
};

// Login route
module.exports.loginUser = async function (req, res) {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  // Authenticate user
  if (authenticateUser(username, password)) {
    // If authentication succeeds, create a session
    req.session.user = {
      username: username,
      // You can add more user information to the session if needed
    };
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
};
