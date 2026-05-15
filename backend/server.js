const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const authRoutes =
  require("./routes/authRoutes");

const projectRoutes =
require("./routes/projectRoutes");

const app = express();

/* Middleware */

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

/* Routes */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.get("/", (req, res) => {

  res.send(
    "ProjectHub Backend Running"
  );

});

/* MongoDB Connection */

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log(
      "MongoDB Connected"
    );

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