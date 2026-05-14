const jwt = require("jsonwebtoken");

/* =========================
   AUTH MIDDLEWARE
========================= */

const authMiddleware =
  (req, res, next) => {

    try {

      const authHeader =
        req.headers.authorization;

      /* No Token */

      if (!authHeader) {

        return res.status(401).json({
          message:
            "No token provided",
        });

      }

      /* Extract Token */

      const token =
        authHeader.split(" ")[1];

      /* Verify */

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      req.user = decoded;

      next();

    }

    catch (error) {

      res.status(401).json({
        message:
          "Invalid token",
      });

    }
  };

module.exports =
  authMiddleware;