const express = require("express");
const db = require("../database");

const router = express.Router();

// all routes start with /users

router.get("/", async (req, res) => {
  const results = await db.query(`SELECT * FROM users`);
  res.status(200).send(results);
});

router.get("/:email", async (req, res) => {
  const email = req.params.email;
  const results = await db.query(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);
  res.status(200).json(results);
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
      res.status(500).send({ msg: "Failed to Create User" });
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

router.post("/delete", async (req, res) => {
  const { email } = req.body;
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

module.exports = router;
