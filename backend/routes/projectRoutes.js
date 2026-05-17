const express = require("express");

const router = express.Router();

const multer = require("multer");

const XLSX = require("xlsx");

const crypto = require("crypto");

const Project =
  require("../models/Project");

const Activity =
  require("../models/Activity");

const authMiddleware =
require("../middleware/authMiddleware");

const {

  getProjects,

  createProject,

  deleteProject,

  getCompletedProjects,

  getDeletedProjects,

  markCompleted,

} = require(
  "../controllers/projectController"
);
/* =========================
   Multer Storage
========================= */

const storage =
  multer.memoryStorage();

const upload = multer({
  storage,
});

/* =========================
   GET PROJECTS
========================= */

router.get(
  "/",
  authMiddleware,
  getProjects
);

/* =========================
   CREATE PROJECT
========================= */

router.post(
  "/",
  authMiddleware,
  createProject
);

/* =========================
   COMPLETED PROJECTS
========================= */

router.get(
  "/completed",
  authMiddleware,
  getCompletedProjects
);

/* =========================
   MARK COMPLETED
========================= */

router.put(
  "/complete/:id",
  authMiddleware,
  markCompleted
);
/* =========================
   DELETED PROJECTS
========================= */
router.get(
  "/deleted",
  authMiddleware,
  getDeletedProjects
);

router.put(
  "/delete/:id",
  authMiddleware,
  deleteProject
)
/* =========================
   UPDATE PROJECT
========================= */
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const updated =
        await Project.findByIdAndUpdate(

          req.params.id,

          req.body,

          {
            new: true,
          }
        );

      res.status(200).json(
        updated
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

/* =========================
   EXCEL UPLOAD
========================= */

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),

  async (req, res) => {

    try {

    /* =========================
   DEACTIVATE ONLY ACTIVE
   NORMAL PROJECTS
========================= */

await Project.updateMany(

  {

    isActiveBatch: true,

    isCompleted: false,

    isDeleted: false,
  },

  {
    $set: {
      isActiveBatch: false,
    },
  }
);

      /* =========================
         CREATE NEW BATCH ID
      ========================= */

      const batchId =
        crypto.randomUUID();

      /* =========================
         READ EXCEL
      ========================= */

      const workbook =
        XLSX.read(
          req.file.buffer,
          {
            type: "buffer",
          }
        );

      const sheet =
        workbook.Sheets[
          workbook.SheetNames[0]
        ];

      const data =
        XLSX.utils.sheet_to_json(
          sheet
        );

      /* =========================
         FORMAT ROWS
      ========================= */

    const formatted =
  data.map((row) => ({

  project_name:

  row[" Title of Project"] ||

  row.project_name ||

  row.Project ||

  "Unnamed Project",

    category:

  row["PROJECT CATEGORY"] ||

  "NA",

    status:

  row["Overall Status"] ||

  row["Status"] ||

  "Pending",

    project_owner:
  row.project_owner ||
  row.Owner ||
  row["Project Owner"] ||
  row["PROJECT OWNER"] ||
  row["owner"] ||
  "Not Assigned",

    start_date:

  row["DATE OF START"] ||

  "",

   end_date:

  row["TARGET DATE"] ||

  "",

    uploadBatchId:
      batchId,

    isActiveBatch:
      true,
}));
/* =========================
   SAVE ACTIVITY
========================= */

await Activity.create({

  user:
    req.user.role,

  action:
    "Uploaded Excel",

  entity:
    `${formatted.length} Projects`,
});
      /* =========================
         SAVE PROJECTS
      ========================= */

      await Project.insertMany(
        formatted
      );

      res.status(200).json({

        message:
          "Excel uploaded successfully",

        count:
          formatted.length,

        batchId,
      });

    }

    catch (error) {

      res.status(500).json({

        message:
          error.message,
      });
    
    }
  }
);

module.exports = router;