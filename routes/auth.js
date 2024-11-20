const express = require("express");
const {
  register,
  login,
  check_auth_sesion,
  sign_out,
} = require("../controllers/authentication");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(sign_out);
router.route("/auth-check-session").get(check_auth_sesion);

module.exports = router;
