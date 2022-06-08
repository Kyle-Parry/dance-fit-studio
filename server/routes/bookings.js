const express = require("express");
const db = require("../database");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// validation rules
bookingValidationRules = [
  body("userId").trim().escape(),
  body("classID").notEmpty().trim().escape(),
  body("cancelDate").trim().escape(),
];

// check validation rules function
checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// all routes start with /bookings
router.get("/", async (req, res) => {
  const results = await db.query(`SELECT * FROM bookings`);
  res.status(200).send(results);
});

// get booking by bookingNumber
router.get("/:userId", async (req, res) => {
  const userId = req.user[0].userId;
  const results = await db.query(
    `SELECT b.bookingNumber, b.userId, b.bookingNumber, b.classID, c.classType, TIME_FORMAT(c.classTime, "%h %i %p") AS time, DATE_FORMAT(c.classDate, "%W %M %e %Y") AS date
  FROM bookings b
  INNER JOIN classes c ON (c.classID = b.classID)
  WHERE b.userId = ? AND b.cancelDate IS null`,
    [userId]
  );
  res.status(200).json(results);
});

router.get("/:bookingNumber", async (req, res) => {
  const bookingNumber = req.body;
  const results = await db.query(
    `SELECT * FROM bookings WHERE bookingNumber = ?`,
    [bookingNumber]
  );
  res.status(200).send(results);
});

// create booking middleware
router.post("/create", bookingValidationRules, checkRules, async (req, res) => {
  const userId = req.user[0].userId;
  const classID = req.body.classID;
  if (userId && classID) {
    try {
      const result = await db.query(
        `INSERT INTO bookings (userId, classID) VALUES (?, ?);`,
        [userId, classID]
      );
      res.status(201).send({ msg: "Created Booking" });
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Failed to Create Booking" });
    }
  }
});

// update booking middleware
router.post("/update", async (req, res) => {
  const bookingNumber = req.body.bookingNumber;
  if (bookingNumber) {
    try {
      const result = await db.query(
        `UPDATE bookings SET cancelDate = NOW() WHERE bookingNumber = ?`,
        [bookingNumber]
      );
      if (result.affectedRows > 0) {
        res.status(200).send({ msg: "Booking Updated" });
        console.log(result);
      } else {
        res.status(404).send({ msg: "Booking Not Found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Update Failed" });
    }
  }
});

// delete booking middleware
router.post("/delete", async (req, res) => {
  const userId = req.body;
  if (userId) {
    try {
      const result = await db.query(
        `DELETE FROM bookings WHERE bookingNumber = ?`,
        [userId]
      );
      if (result.affectedRows > 0) {
        res.status(204).send({ msg: "Booking Deleted" });
        console.log(result);
      } else {
        res.status(404).send({ msg: "Booking Not Found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Delete Failed" });
    }
  }
});

module.exports = router;
