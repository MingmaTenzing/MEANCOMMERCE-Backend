const express = require("express");
const {
  register,
  login,
  session_check,
} = require("../controllers/authentication");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/session-check").post(session_check);

module.exports = router;
