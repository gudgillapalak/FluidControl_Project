const Project =
  require("../models/Project");

/* =========================
   GET ACTIVE PROJECTS
========================= */

exports.getProjects =
  async (req, res) => {

    try {

      const projects =
        await Project.find({

          isDeleted: false,

          isActiveBatch: true,
        });

      res.status(200).json(
        projects
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message,
      });

    }
  };
/* =========================
   CREATE PROJECT
========================= */

exports.createProject =
  async (req, res) => {

    try {

      const project =
        await Project.create({

          project_name:
            req.body.project_name,

          client_name:
            req.body.client_name,

          category:
            req.body.category || "NA",

          status:
            req.body.status || "Pending",

          project_owner:
            req.body.project_owner ||
            "Not Assigned",

          start_date:
            req.body.start_date || "",

          end_date:
            req.body.end_date || "",

          description:
            req.body.description || "",

          priority:
            req.body.priority || "",

          isCompleted:
            req.body.isCompleted || false,

          isDeleted: false,

          remarks: [],
        });

      res.status(201).json(
        project
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message,
      });

    }
  };

/* =========================
   DELETE PROJECT
========================= */

exports.deleteProject =
  async (req, res) => {

    try {

      const updated =
        await Project.findByIdAndUpdate(

          req.params.id,

          {

            isDeleted: true,
          },

          {
            new: true,
          }
        );

      res.status(200).json({

        message:
          "Project moved to deleted",

        updated,
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
   GET COMPLETED PROJECTS
========================= */

exports.getCompletedProjects =
  async (req, res) => {

    try {

      const projects =
        await Project.find({

          isCompleted: true,

          isDeleted: false,

          isActiveBatch: true,
        });

      res.status(200).json(
        projects
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message,
      });

    }
  };

/* =========================
   GET DELETED PROJECTS
========================= */

exports.getDeletedProjects =
  async (req, res) => {

    try {

      const projects =
        await Project.find({

          isDeleted: true,

          isActiveBatch: true,
        });

      res.status(200).json(
        projects
      );

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message,
      });

    }
  };