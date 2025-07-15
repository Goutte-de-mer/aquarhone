var express = require("express");
var router = express.Router();
const { registerUser, login, logout } = require("../controller/authController");
const validateRegister = require("../middlewares/validateRegister");
const validateLogin = require("../middlewares/validateLogin");
const authenticateToken = require("../middlewares/authenticateToken");
const User = require("../db/models/User");

// Register a new user
router.post("/api/register", validateRegister, registerUser);

// Get user profile
router.get("/api/me", authenticateToken, async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "firstName lastName email role"
  );
  if (!user)
    return res.status(404).json({ message: "Utilisateur introuvable" });
  res.json(user);
});

// Login user
router.post("/api/login", validateLogin, login);

// Logout user
router.get("/api/logout", logout);

module.exports = router;
