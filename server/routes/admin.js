const { Router } = require("express");
const db = require("../database");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const ipfilter = require("express-ipfilter").IpFilter;

const router = Router();

// validation rules
createUserValidationRules = [
  body("email").isEmail().trim().escape(),
  body("password").isLength({ min: 5, max: 20 }).trim().escape(),
  body("firstName").notEmpty().trim().escape(),
  body("lastName").notEmpty().trim().escape(),
];
updateUserValidationRules = [
  body("accountLevel").notEmpty().trim().escape(),
  body("userId").notEmpty().trim().escape(),
];
deleteUserValidationRules = [body("userId").notEmpty().trim().escape()];

createClassValidationRules = [
  body("classType").notEmpty().trim().escape(),
  body("description").notEmpty().trim().escape(),
  body("classDate").notEmpty().trim().escape(),
  body("classTime").trim().escape(),
];
updateClassValidationRules = [
  body("classType").notEmpty().trim().escape(),
  body("description").notEmpty().trim().escape(),
  body("classDate").notEmpty().trim().escape(),
  body("classTime").notEmpty().trim().escape(),
  body("classCancelled").trim().escape(),
];
deleteClassValidationRules = [body("classID").notEmpty().trim().escape()];

// check validation rules function
checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// List of Whitelisted IP addresses
// ipfilter(ips, { mode: "allow" } is called on all admin routes to
// restrict access to admin routes to only whitelisted IPs
const ips = ["::1"];

// user admin middleware
// all routes start with /users
router.get("/users", ipfilter(ips, { mode: "allow" }), async (req, res) => {
  const results = await db.query(
    `SELECT userId, email, firstName, lastName, accountLevel FROM users`
  );
  res.status(200).json(results);
});

// get user by email
router.get(
  "/users/:userId",
  ipfilter(ips, { mode: "allow" }),
  async (req, res) => {
    const userId = req.params.userId;
    const results = await db.query(
      `SELECT userId, email, firstName, lastName, accountLevel FROM users WHERE userId = ?`,
      [userId]
    );
    res.status(200).json(results);
  }
);
// create user middleware
router.post(
  "/createUser",
  ipfilter(ips, { mode: "allow" }),
  createUserValidationRules,
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
  ipfilter(ips, { mode: "allow" }),
  updateUserValidationRules,
  checkRules,
  async (req, res) => {
    const { accountLevel, userId } = req.body;

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
router.post(
  "/deleteUser",
  ipfilter(ips, { mode: "allow" }),
  deleteUserValidationRules,
  checkRules,
  async (req, res) => {
    const { userId } = req.body;
    if (userId) {
      try {
        const result = await db.query(`DELETE FROM users WHERE userId = ?`, [
          userId,
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
  }
);

// class admin middleware
// all routes start with /classes
router.get("/classes", ipfilter(ips, { mode: "allow" }), async (req, res) => {
  const results =
    await db.query(`SELECT c.classID, c.classType, c.description, TIME_FORMAT(c.classTime, "%h %i %p") AS time, i.imgPath, i.imgAlt, DATE_FORMAT(c.classDate, "%W %M %e %Y") AS date
    FROM classes c 
    INNER JOIN images i ON (i.imgID = c.imgID)`);
  res.status(200).send(results);
});

// get class by classID
router.get(
  "/classes/:classID",
  ipfilter(ips, { mode: "allow" }),
  async (req, res) => {
    const classID = req.params.classID;
    const results = await db.query(`SELECT * FROM classes WHERE classID = ?`, [
      classID,
    ]);
    res.status(200).json(results);
  }
);

// create class middleware
router.post(
  "/createClass",
  ipfilter(ips, { mode: "allow" }),
  createClassValidationRules,
  checkRules,
  async (req, res) => {
    const { classType, description, classDate, classTime, imgID } = req.body;

    if (classType && description && classDate && classTime && imgID) {
      try {
        const result = await db.query(
          `INSERT INTO classes (classType, description, classDate, classTime, imgID)
          VALUES (?, ?, ?, ?, ?)`,
          [classType, description, classDate, classTime, imgID]
        );
        res.status(201).send({ msg: "Created Class" });
        console.log(result);
      } catch (err) {
        console.log(err);
        res.status(500).send({ msg: "Failed to Create Class" });
      }
    }
  }
);

// update class middleware
router.post(
  "/updateClass",
  ipfilter(ips, { mode: "allow" }),
  updateClassValidationRules,
  checkRules,
  async (req, res) => {
    const {
      classType,
      description,
      classDate,
      classTime,
      imgID,
      classCancelled,
      classID,
    } = req.body;

    if (
      classType &&
      description &&
      classDate &&
      classTime &&
      imgID &&
      classCancelled &&
      classID
    ) {
      try {
        const result = await db.query(
          `UPDATE classes SET classType = ?, Description = ?, classDate = ?, classTime = ?,imgID = ?, classCancelled = ? WHERE classID = ?`,
          [
            classType,
            description,
            classDate,
            classTime,
            imgID,
            classCancelled,
            classID,
          ]
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
  }
);

// delete class middleware
router.post(
  "/deleteClass",
  deleteClassValidationRules,
  checkRules,
  ipfilter(ips, { mode: "allow" }),
  async (req, res) => {
    const { classID } = req.body;
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
  }
);

router.get("/imgs", ipfilter(ips, { mode: "allow" }), async (req, res) => {
  const results = await db.query(`SELECT * FROM images`);
  res.status(200).json(results);
});

module.exports = router;
