const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserByUsernameAndPassword,
} = require("../controller/User");

router.post("/users/createUser", createUser);
router.post("/login", loginUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users/login", getUserByUsernameAndPassword);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
