const { Router } = require("express");

const router = Router();

router.post("/", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
