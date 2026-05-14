const mongoose = require("mongoose");

const projectSchema =
  new mongoose.Schema(

    {

      project_name: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        default: "NA",
      },

      status: {
        type: String,
        default: "Pending",
      },

      project_owner: {
        type: String,
        default: "Not Assigned",
      },
      employees: [
  {
    type: String,
  },
],

      start_date: {
        type: String,
      },

      end_date: {
        type: String,
      },

      client_name: {
        type: String,
      },

      description: {
        type: String,
      },

      priority: {
        type: String,
      },

      isDeleted: {
        type: Boolean,
        default: false,
      },

      isCompleted: {
        type: Boolean,
        default: false,
      },

      remarks: [
        {
          message: String,

          user: String,

          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],

    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Project",
    projectSchema
  );