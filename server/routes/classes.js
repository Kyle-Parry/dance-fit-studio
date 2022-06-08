const express = require("express");
const db = require("../database");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// validation rules
classValidationRules = [
  body("userId").trim().escape(),
  body("classType").notEmpty().trim().escape(),
  body("description").notEmpty().trim().escape(),
  body("classSchedule").trim().escape(),
  body("classCancelled").trim().escape(),
];

// check validation rules function
checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// all routes start with /classes
router.get("/", async (req, res) => {
  const results =
    await db.query(`SELECT c.classID, c.classType, c.Description, TIME_FORMAT(c.classTime, "%h %i %p") AS time, i.imgPath, i.imgAlt, DATE_FORMAT(c.classDate, "%W %M %e %Y") AS date
    FROM classes c 
    INNER JOIN images i ON (i.imgID = c.imgID)`);
  res.status(200).send(results);
});

// get class by classID
router.get("/:classID", async (req, res) => {
  const classID = req.params.classID;
  const results = await db.query(`SELECT * FROM classes WHERE classID = ?`, [
    classID,
  ]);
  res.status(200).json(results);
});

// create class middleware
router.post("/create", classValidationRules, checkRules, async (req, res) => {
  const { classType, description, classSchedule } = req.body;
  const userId = JSON.stringify(req.user);
  if (classType && description && classSchedule && userId) {
    try {
      const result = await db.query(
        `INSERT INTO classes (classType, description, classSchedule, userId)
        VALUES (?, ?, ?, ?)`,
        [classType, description, classSchedule, userId]
      );
      res.status(201).send({ msg: "Created Class" });
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Failed to Create Class" });
    }
  }
});

// update class middleware
router.post("/update", classValidationRules, checkRules, async (req, res) => {
  const {
    classID,
    classType,
    description,
    classSchedule,
    classCancelled,
    userId,
  } = req.body;
  if (
    classID &&
    classType &&
    description &&
    classSchedule &&
    classCancelled &&
    userId
  ) {
    try {
      const result = await db.query(
        `UPDATE classes SET classType = ?, description = ?, classSchedule = ?, classCancelled = ?, userId = ? WHERE classID = ?`,
        [classType, description, classSchedule, classCancelled, userId, classID]
      );
      if (result.affectedRows > 0) {
        res.status(200).send({ msg: "Class Updated" });
        console.log(result);
      } else {
        res.status(404).send({ msg: "Class Not Found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Update Failed" });
    }
  }
});

// delete class middleware
router.post("/delete", async (req, res) => {
  const classID = req.body;
  if (classID) {
    try {
      const result = await db.query(`DELETE FROM classes WHERE classID = ?`, [
        classID,
      ]);
      if (result.affectedRows > 0) {
        res.status(204).send({ msg: "Class Deleted" });
        console.log(result);
      } else {
        res.status(404).send({ msg: "Class Not Found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Delete Failed" });
    }
  }
});

module.exports = router;
