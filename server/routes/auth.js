const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.post("/login", passport.authenticate("user"), (req, res) => {
  res.status(200).send({ msg: "Logged in" });
});

router.post("/admin", passport.authenticate("admin"), (req, res) => {
  res.status(200).send({ msg: "Logged in" });
});

module.exports = router;
