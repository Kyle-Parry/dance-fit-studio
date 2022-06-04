const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/", async (req, res) => {
  const results = await db.query(`SELECT * FROM special_occasions`);
  res.status(200).send(results);
});

module.exports = router;
