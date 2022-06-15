const { Router } = require("express");
const passport = require("passport");
const ipfilter = require("express-ipfilter").IpFilter;

const router = Router();

router.post("/login", passport.authenticate("user"), (req, res) => {
  res.status(200).send({ msg: "Logged in" });
});

// The admin login route will only run with
// whitelisted IP addresses.

router.post("/admin", passport.authenticate("admin"), (req, res) => {
  res.status(200).send({ msg: "Logged in" });
});

module.exports = router;
