const express = require("express");
const router = express.Router();
const { fetch_user_details } = require("../controllers/dashboard");
router.route("/user-details").get(fetch_user_details);

module.exports = router;
