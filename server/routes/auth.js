const { Router } = require("express");
const passport = require("passport");
const ipfilter = require("express-ipfilter").IpFilter;

const router = Router();

router.post("/login", passport.authenticate("user"), (req, res) => {
  res.status(200).send({ msg: "Logged in" });
});

// The admin login route will only run with
// whitelisted IP addresses.
const ips = ["1.128.105.177"];

router.post(
  "/admin",
  ipfilter(ips, { mode: "allow" }),
  passport.authenticate("admin"),
  (req, res) => {
    res.status(200).send({ msg: "Logged in" });
  }
);

module.exports = router;
