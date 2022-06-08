const { Router } = require("express");
const passport = require("passport");
const ipfilter = require("express-ipfilter").IpFilter;

const router = Router();

const ips = ["::1"];

router.post("/login", passport.authenticate("user"), (req, res) => {
  res.status(200).send({ msg: "Logged in" });
});

router.post(
  "/admin",
  ipfilter(ips, { mode: "allow" }),
  passport.authenticate("admin"),
  (req, res) => {
    res.status(200).send({ msg: "Logged in" });
  }
);

module.exports = router;
