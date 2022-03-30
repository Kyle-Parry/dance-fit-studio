const express = require("express");
const db = require("../database");

const router = express.Router();

// all routes start with /bookings

router.get("/", async (req, res) => {
  const results = await db.query(`SELECT * FROM bookings`);
  res.status(200).send(results);
});

router.get("/:bookingNumber", async (req, res) => {
  const email = req.params.email;
  const results = await db.query(
    `SELECT * FROM bookings WHERE bookingNumber = ?`,
    [email]
  );
  res.status(200).json(results);
});

router.post("/create", async (req, res) => {
  const { email, classID, bookingDate } = req.body;
  if (email && classID && bookingDate) {
    try {
      const result = await db.query(
        `INSERT INTO bookings (email, classID, bookingDate)
        VALUES (?, ?, ?)`,
        [email, classID, bookingDate]
      );
      res.status(201).send({ msg: "Created Booking" });
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Failed to Create Booking" });
    }
  }
});

router.post("/update", async (req, res) => {
  const { bookingNumber, cancelDate } = req.body;
  if (bookingNumber && cancelDate) {
    try {
      const result = await db.query(
        `UPDATE bookings SET cancelDate = ? WHERE bookingNumber = ?`,
        [bookingNumber, classID, bookingDate, cancelDate]
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

router.post("/delete", async (req, res) => {
  const email = req.body;
  if (email) {
    try {
      const result = await db.query(
        `DELETE FROM bookings WHERE bookingNumber = ?`,
        [email]
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
