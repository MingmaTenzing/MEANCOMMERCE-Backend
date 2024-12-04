const express = require("express");
const {
  register,
  login,
  check_auth_sesion,
  sign_out,
} = require("../controllers/authentication");
const router = express.Router();
const passport = require("passport");
require("../utils/passport");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(sign_out);
router.route("/auth-check-session").get(check_auth_sesion);

router.route("/google").get(passport.authenticate("google"));

router.route("/google/redirect").get(
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("http://localhost:4200");
  }
);

module.exports = router;
