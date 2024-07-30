const express = require("express");
const checkoutSession = require("../controllers/checkout-session");

const router = express.Router();

router.route("/").post(checkoutSession);

module.exports = router;
