const { Router } = require("express");
const passport = require("passport");
const ipfilter = require("express-ipfilter").IpFilter;

const router = Router();

router.post("/login", passport.authenticate("user"), (req, res) => {
  res.status(200).send({ msg: "Logged in" });
});

// The admin login route will only run with
// whitelisted IP addresses.
ipWhiteList = (req, res, next) => {
  let validIps = ["1.128.108.225", "1.128.105.177"]; // Put your IP whitelist in this array

  if (validIps.includes(req.connection.remoteAddress)) {
    // IP is ok, so go on
    console.log("IP ok");
    next();
  } else {
    // Invalid ip
    console.log("Bad IP: " + req.connection.remoteAddress);
    const err = new Error("Bad IP: " + req.connection.remoteAddress);
    next(err);
  }
};

const ips = ["1.128.108.225", "1.128.105.177", "10.1.37.95"];

router.post(
  "/admin",
  ipfilter(ips, { mode: "allow" }),
  passport.authenticate("admin"),
  (req, res) => {
    res.status(200).send({ msg: "Logged in" });
  }
);

module.exports = router;
