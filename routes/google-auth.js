const express = require("express");
const passport = require("passport");
const router = express.Router();

require("../utils/passport");

router.route("/").get(passport.authenticate("google"));

router.route("/redirect").get(
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.send("user succesfful");
  }
);

module.exports = router;