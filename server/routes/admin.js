const { Router } = require("express");
const db = require("../database");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

const router = Router();

function checkNotAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user[0].accountLevel == "Admin") {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/");
  }
}

// user admin middleware
// all routes start with /users
router.get("/users", async (req, res) => {
  const results = await db.query(
    `SELECT userId, email, firstName, lastName, accountLevel FROM users`
  );
  res.status(200).json(results);
});

// get user by email
router.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const results = await db.query(
    `SELECT userId, email, firstName, lastName, accountLevel FROM users WHERE userId = ?`,
    [userId]
  );
  res.status(200).json(results);
});
// create user middleware
router.post(
  "/createUser",
  userValidationRules,
  checkRules,
  async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    // password hashing
    const hash = await bcrypt.hashSync(password, 10);

    if (firstName && lastName && email && hash) {
      try {
        const result = await db.query(
          `INSERT INTO users (firstName, lastName, email, password)
        VALUES (?, ?, ?, ?)`,
          [firstName, lastName, email, hash]
        );
        res.status(201).send({ msg: "Created User" });
        console.log(result);
      } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Failed to Create User" });
      }
    }
  }
);

router.post(
  "/updateUser",

  async (req, res) => {
    const accountLevel = req.accountLevel;
    const userId = req.userId;

    if (accountLevel && userId) {
      try {
        const result = await db.query(
          `UPDATE users SET accountLevel = ? WHERE userId  = ?`,
          [accountLevel, userId]
        );
        if (result.affectedRows > 0) {
          res.status(200).send({ msg: "User Updated" });
          console.log(result);
        } else {
          res.status(404).send({ msg: "User Not Found" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Update Failed" });
      }
    }
  }
);

// delete user middleware
router.post("/deleteUser", async (req, res) => {
  const email = req.body;
  if (email) {
    try {
      const result = await db.query(`DELETE FROM users WHERE email = ?`, [
        email,
      ]);
      if (result.affectedRows > 0) {
        res.status(204).send({ msg: "User Deleted" });
        console.log(result);
      } else {
        res.status(404).send({ msg: "User Not Found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Delete Failed" });
    }
  }
});

// booking admin middleware
router.get("/bookings", async (req, res) => {
  const results = await db.query(`SELECT * FROM bookings`);
  res.status(200).send(results);
});

router.post("/createBooking", async (req, res) => {
  const userId = req.params.id;
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
router.post("/updateBooking", async (req, res) => {
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
router.post("/deleteBooking", async (req, res) => {
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

// class admin middleware
// all routes start with /classes
router.get("/classes", async (req, res) => {
  const results =
    await db.query(`SELECT c.classID, c.classType, c.Description, c.classTime, i.imgPath, i.imgAlt, DATE_FORMAT(c.classDate, "%W %M %e %Y") AS date
    FROM classes c 
    INNER JOIN images i ON (i.imgID = c.imgID)`);
  res.status(200).send(results);
});

// get class by classID
router.get("/classes/:classID", async (req, res) => {
  const classID = req.params.classID;
  const results = await db.query(`SELECT * FROM classes WHERE classID = ?`, [
    classID,
  ]);
  res.status(200).json(results);
});

// create class middleware
router.post("/createClass", async (req, res) => {
  const { classType, description, classSchedule } = req.body;
  const userId = req.user[0].userId;
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
router.post("/updateClass", async (req, res) => {
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
router.post("/deleteClass", async (req, res) => {
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
