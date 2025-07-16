var express = require("express");
var router = express.Router();
const { registerUser, login, logout } = require("../controller/authController");
const validateRegister = require("../middlewares/validateRegister");
const validateLogin = require("../middlewares/validateLogin");
const authenticateToken = require("../middlewares/authenticateToken");
const { registerUserToActivity } = require("../controller/userController");
const User = require("../db/models/User");

// Register a new user
router.post("/register", validateRegister, registerUser);

// Get user profile
router.get("/me", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "firstName lastName email role activities"
  );
  if (!user)
    return res.status(404).json({ message: "Utilisateur introuvable" });
  res.json(user);
});

// Login user
router.post("/login", validateLogin, login);

// Logout user
router.get("/logout", logout);

// Sign up for activity
router.post(
  "/activities/:activityId/register",
  authenticateToken,
  registerUserToActivity
);

module.exports = router;
