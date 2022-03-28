const express = require("express");
const db = require("../database");

const router = express.Router();

// all routes start with /users

router.get("/", async (req, res) => {
  const results = await db.query(`SELECT * FROM users`);
  res.status(200).send(results);
});

router.post("/create", async (req, res) => {
  const { email, password, firstName, lastName, accountLevel } = req.body;
  if (email && password && firstName && lastName && accountLevel) {
    try {
      const result = await db.query(
        `INSERT INTO users (email, password, firstName, lastName, accountLevel)
        VALUES (?, ?, ?, ?, ?)`,
        [email, password, firstName, lastName, accountLevel]
      );
      res.status(201).send({ msg: "Created User" });
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "User already exists" });
    }
  }
});

router.post("/update", async (req, res) => {
  const { email, password, firstName, lastName, accountLevel } = req.body;
  if (email && password && firstName && lastName && accountLevel) {
    try {
      const result = await db.query(
        `UPDATE users SET password = ?, firstName = ?, lastName = ?, accountLevel = ? WHERE email = ?`,
        [password, firstName, lastName, accountLevel, email]
      );
      res.status(201).send({ msg: "User Updated" });
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Update Failed" });
    }
  }
});

module.exports = router;
