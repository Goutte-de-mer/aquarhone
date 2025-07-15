var express = require("express");
var router = express.Router();
const authController = require("../controller/authController");

/* GET users listing. */
router.post("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Register a new user
router.post("/register", authController.registerUser);

module.exports = router;
