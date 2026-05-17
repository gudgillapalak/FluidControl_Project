const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

/* =========================
   SIGNUP
========================= */

exports.signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role,
    } = req.body;

    /* =========================
       BLOCK PROTECTED ROLES
    ========================= */

    if (
      role === "superadmin" ||
      role === "admin" ||
      role === "manager"
    ) {

      return res.status(403).json({

        message:
          "Signup not allowed for this role",
      });
    }

    /* =========================
       CHECK EXISTING USER
    ========================= */

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({

        message:
          "User already exists",
      });
    }

    /* =========================
       HASH PASSWORD
    ========================= */

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    /* =========================
       CREATE EMPLOYEE
    ========================= */

    await User.create({

      name,

      email,

      password:
        hashedPassword,

      role:
        "employee",
    });

    res.status(201).json({

      message:
        "Account created successfully",
    });

  }

  catch (error) {

    res.status(500).json({

      message:
        error.message,
    });

  }
};

/* =========================
   LOGIN
========================= */

exports.login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    /* =========================
       FIND USER
    ========================= */

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return res.status(400).json({

        message:
          "User not found",
      });
    }

    /* =========================
       CHECK PASSWORD
    ========================= */

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        message:
          "Invalid password",
      });
    }

    /* =========================
       CREATE TOKEN
    ========================= */

    const token =
      jwt.sign(

        {
          id: user._id,
          role: user.role,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        }
      );

    /* =========================
       RESPONSE
    ========================= */

    res.status(200).json({

      token,

      user: {

        id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,
      },
    });

  }

  catch (error) {

    res.status(500).json({

      message:
        error.message,
    });

  }
};

/* =========================
   CREATE ADMIN / MANAGER
========================= */

exports.createUser =
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
        role,
      } = req.body;

      /* =========================
         VALIDATE ROLE
      ========================= */

      if (
        role !== "admin" &&
        role !== "manager"
      ) {

        return res.status(400).json({

          message:
            "Invalid role",
        });
      }

      /* =========================
         CHECK EXISTING USER
      ========================= */

      const existing =
        await User.findOne({
          email,
        });

      if (existing) {

        return res.status(400).json({

          message:
            "User already exists",
        });
      }

      /* =========================
         HASH PASSWORD
      ========================= */

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      /* =========================
         CREATE USER
      ========================= */

      await User.create({

        name,

        email,

        password:
          hashedPassword,

        role,
      });

      res.status(201).json({

        message:
          `${role} created successfully`,
      });

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message,
      });

    }
  };