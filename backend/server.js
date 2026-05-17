const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const bcrypt =
  require("bcryptjs");

const User =
  require("./models/User");

const authRoutes =
  require("./routes/authRoutes");

const projectRoutes =
  require("./routes/projectRoutes");

const activityRoutes =
  require("./routes/activityRoutes");

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(
  cors({
    origin: "*",

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json());

/* =========================
   ROUTES
========================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/activity",
  activityRoutes
);

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {

  res.send(
    "ProjectHub Backend Running"
  );

});

/* =========================
   MONGODB CONNECTION
========================= */

mongoose
  .connect(
    process.env.MONGO_URI
  )

  .then(async () => {

    console.log(
      "MongoDB Connected"
    );

    /* =========================
       CREATE SUPERADMIN
    ========================= */

    const createSuperAdmin =
      async () => {

        try {

          const existing =
            await User.findOne({

              role:
                "superadmin",
            });

          if (!existing) {

           const hashedPassword =
  await bcrypt.hash(
    "FluidControl@2026Secure",
    10
  );

            await User.create({

              name:
                "Main Super Admin",

              email:
  "fluidcontrol.superuser@gmail.com",

              password:
                hashedPassword,

              role:
                "superadmin",
            });

            console.log(
              "Superadmin created"
            );
          }

          else {

            console.log(
              "Superadmin already exists"
            );
          }

        }

        catch (error) {

          console.log(error);
        }
      };

    await createSuperAdmin();

    /* =========================
       START SERVER
    ========================= */

    app.listen(
      process.env.PORT,
      () => {

        console.log(

          `Server running on port ${process.env.PORT}`
        );

      }
    );
  })

  .catch((err) => {

    console.log(err);

  });