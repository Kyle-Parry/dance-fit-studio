const express = require("express");
const db = require("../database");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// validation rules
userValidationRules = [
  body("username").isEmail().trim().escape(),
  body("password").isLength({ min: 5 }).trim().escape(),
  body("firstName").notEmpty().trim().escape(),
  body("lastName").notEmpty().trim().escape(),
  body("accountLevel").trim().escape(),
];

// check validation rules function
checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// all routes start with /users
router.get("/", async (req, res) => {
  const results = await db.query(
    `SELECT username, firstName, lastName, accountLevel FROM users`
  );
  res.status(200).json(results);
});

// get user by username
router.get("/:username", async (req, res) => {
  const username = req.params.username;
  const results = await db.query(
    `SELECT username, firstName, lastName, accountLevel FROM users WHERE username = ?`,
    [username]
  );
  res.status(200).json(results);
});

// create user middleware
router.post("/create", userValidationRules, checkRules, async (req, res) => {
  const { username, password, firstName, lastName, accountLevel } = req.body;
  // password hashing
  const hash = await bcrypt.hashSync(password, 10);

  if (username && hash && firstName && lastName && accountLevel) {
    try {
      const result = await db.query(
        `INSERT INTO users (username, password, firstName, lastName, accountLevel)
        VALUES (?, ?, ?, ?, ?)`,
        [username, hash, firstName, lastName, accountLevel]
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
router.post("/update", userValidationRules, checkRules, async (req, res) => {
  const { username, password, firstName, lastName, accountLevel } = req.body;

  const hash = await bcrypt.hashSync(password, 10);

  if (username && hash && firstName && lastName && accountLevel) {
    try {
      const result = await db.query(
        `UPDATE users SET password = ?, firstName = ?, lastName = ?, accountLevel = ? WHERE username = ?`,
        [hash, firstName, lastName, accountLevel, username]
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
});

// delete user middleware
router.post("/delete", async (req, res) => {
  const username = req.body;
  if (username) {
    try {
      const result = await db.query(`DELETE FROM users WHERE username = ?`, [
        username,
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

module.exports = router;
