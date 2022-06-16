const { Router } = require("express");
const passport = require("passport");
const ipfilter = require("express-ipfilter").IpFilter;
const AccessControl = require("express-ip-access-control");

const router = Router();

router.post("/login", passport.authenticate("user"), (req, res) => {
  res.status(200).send({ msg: "Logged in" });
});

// The admin login route will only run with
// whitelisted IP addresses.
var options = {
  mode: "deny",
  denys: [],
  allows: ["1.128.108.225"],
  forceConnectionAddress: false,
  log: function (clientIp, access) {
    console.log(clientIp + (access ? " accessed." : " denied."));
  },

  statusCode: 401,
  redirectTo: "",
  message: "Unauthorized",
};

const ips = ["1.128.108.225", "1.128.105.177", "10.1.37.95"];

router.post(
  "/admin",
  AccessControl(options),
  passport.authenticate("admin"),
  (req, res) => {
    res.status(200).send({ msg: "Logged in" });
  }
);

module.exports = router;
