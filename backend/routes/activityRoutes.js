const express = require("express");

const router =
  express.Router();

const Activity =
  require("../models/Activity");

const authMiddleware =
  require("../middleware/authMiddleware");

/* =========================
   GET ACTIVITIES
========================= */

router.get(
  "/",
  authMiddleware,

  async (req, res) => {

    try {

      const activities =
        await Activity.find()

          .sort({
            createdAt: -1,
          });

      res.status(200).json(
        activities
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message,
      });

    }
  }
);

module.exports =
  router;