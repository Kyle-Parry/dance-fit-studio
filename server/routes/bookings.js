const express = require("express");
const db = require("../database");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// validation rules
bookingValidationRules = [
  body("username").isEmail().trim().escape(),
  body("classID").notEmpty().trim().escape(),
  body("bookingDate").notEmpty().trim().escape(),
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
router.get("/:bookingNumber", async (req, res) => {
  const bookingNumber = req.params.bookingNumber;
  const results = await db.query(
    `SELECT * FROM bookings WHERE bookingNumber = ?`,
    [bookingNumber]
  );
  res.status(200).json(results);
});

// create booking middleware
router.post("/create", bookingValidationRules, checkRules, async (req, res) => {
  const { username, classID, bookingDate } = req.body;
  if (username && classID && bookingDate) {
    try {
      const result = await db.query(
        `INSERT INTO bookings (username, classID, bookingDate)
        VALUES (?, ?, ?)`,
        [username, classID, bookingDate]
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
router.post("/update", bookingValidationRules, checkRules, async (req, res) => {
  const { bookingNumber, username, classID, bookingDate, cancelDate } =
    req.body;
  if (bookingNumber && username && classID && bookingDate && cancelDate) {
    try {
      const result = await db.query(
        `UPDATE bookings SET username = ?, classID = ?, bookingDate = ?, cancelDate = ? WHERE bookingNumber = ?`,
        [username, classID, bookingDate, cancelDate, bookingNumber]
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
  const username = req.body;
  if (username) {
    try {
      const result = await db.query(
        `DELETE FROM bookings WHERE bookingNumber = ?`,
        [username]
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
