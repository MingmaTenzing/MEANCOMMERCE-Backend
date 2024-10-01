const express = require("express");
const router = express.Router();
const { fetch_user_details } = require("../controllers/dashboard");
const { sign_out } = require("../controllers/authentication");
router.route("/user-details").get(fetch_user_details);
router.route("/logout").get(sign_out);

module.exports = router;
