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

module.exports = router;
