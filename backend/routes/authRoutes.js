const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  createUser,
} = require("../controllers/authController");

router.post("/signup", signup);

router.post("/login", login);
router.post(
  "/create-user",
  createUser
);

module.exports = router;