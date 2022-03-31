const express = require("express");
const db = require("../database");

const router = express.Router();

// all routes start with /classes

router.get("/", async (req, res) => {
  const results = await db.query(`SELECT * FROM classes`);
  res.status(200).send(results);
});

router.get("/:classID", async (req, res) => {
  const classID = req.params.classID;
  const results = await db.query(`SELECT * FROM classes WHERE classID = ?`, [
    classID,
  ]);
  res.status(200).json(results);
});

router.post("/create", async (req, res) => {
  const { classType, description, classSchedule, email } = req.body;
  if (classType && description && classSchedule && email) {
    try {
      const result = await db.query(
        `INSERT INTO classes (classType, description, classSchedule, email)
        VALUES (?, ?, ?, ?)`,
        [classType, description, classSchedule, email]
      );
      res.status(201).send({ msg: "Created Class" });
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Failed to Create Class" });
    }
  }
});

router.post("/update", async (req, res) => {
  const {
    classID,
    classType,
    description,
    classSchedule,
    classCancelled,
    email,
  } = req.body;
  if (
    classID &&
    classType &&
    description &&
    classSchedule &&
    classCancelled &&
    email
  ) {
    try {
      const result = await db.query(
        `UPDATE classes SET classType = ?, description = ?, classSchedule = ?, classCancelled = ?, email = ? WHERE classID = ?`,
        [classType, description, classSchedule, classCancelled, email, classID]
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
