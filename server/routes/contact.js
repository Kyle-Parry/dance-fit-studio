const express = require("express");
const db = require("../database");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// validation rules
contactValidationRules = [
  body("name").notEmpty().trim().escape(),
  body("email").notEmpty().isEmail().trim().escape(),
  body("message").notEmpty().trim().escape(),
];

// check validation rules function
checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// create message middleware
router.post("/create", contactValidationRules, checkRules, async (req, res) => {
  const { name, email, message } = req.body;
  if ((name && email, message)) {
    try {
      const result = await db.query(
        `INSERT INTO contact_us (name, email, message) VALUES (?, ?, ?);`,
        [name, email, message]
      );
      res.status(201).send({ msg: "Message Created" });
      console.log(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: "Failed to create message" });
    }
  }
});

module.exports = router;
