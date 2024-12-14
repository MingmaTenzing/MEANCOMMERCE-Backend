const express = require("express");
const router = express.Router();
const { openai_suggestion } = require("../controllers/openai");

router.route("/shop_ai").post(openai_suggestion);

module.exports = router;
