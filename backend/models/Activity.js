const mongoose = require("mongoose");

const activitySchema =
  new mongoose.Schema(

    {

      user: {
        type: String,
      },

      action: {
        type: String,
      },

      entity: {
        type: String,
      },

    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Activity",
    activitySchema
  );