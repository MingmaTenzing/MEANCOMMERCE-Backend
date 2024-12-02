const express = require("express");
const passport = require("passport");
const router = express.Router();

const GoogleStrategy = require("passport-google-oidc");

require("../utils/passport");

router.route("/").get(passport.authenticate("google"));

router.route("/redirect").get(
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    console.log(req.user);
    res.redirect("http://localhost:4200");
    res.json(req.user);
  }
);

module.exports = router;
