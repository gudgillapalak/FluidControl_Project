const express = require("express");

const router = express.Router();

const {

  signup,

  login,

  createUser,

} = require(
  "../controllers/authController"
);

/* =========================
   AUTH
========================= */

router.post(
  "/signup",
  signup
);

router.post(
  "/login",
  login
);

/* =========================
   CREATE USER
========================= */

router.post(
  "/create-user",
  createUser
);

module.exports =
  router;