const express = require("express");
const db = require("../database");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

const router = express.Router();

// validation rules
userValidationRules = [
  body("email").isEmail().trim().escape(),
  body("password").isLength({ min: 5 }).trim().escape(),
  body("firstName").notEmpty().trim().escape(),
  body("lastName").notEmpty().trim().escape(),
];

// check validation rules function
checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/login");
  }
}

// get user by email
router.get("/:userId", checkAuthentication, async (req, res) => {
  const userId = req.user[0].userId;
  const results = await db.query(
    `SELECT email, firstName, lastName FROM users WHERE userId = ?`,
    [userId]
  );
  res.status(200).json(results);
});

// create user middleware
router.post("/create", userValidationRules, checkRules, async (req, res) => {
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
});

// update user middleware
router.post(
  "/update",
  checkAuthentication,
  userValidationRules,
  checkRules,
  async (req, res) => {
    const { email, lastName, firstName, password } = req.body;
    const userId = req.user[0].userId;
    const hash = await bcrypt.hashSync(password, 10);

    if (email && lastName && firstName && hash && userId) {
      try {
        const result = await db.query(
          `UPDATE users SET email = ?, firstName = ?, lastName = ?, password = ? WHERE userId  = ?`,
          [email, firstName, lastName, hash, userId]
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

module.exports = router;
