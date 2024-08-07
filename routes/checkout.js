const express = require("express");
const {
  checkoutSession,
  sessionStatus,
} = require("../controllers/checkout-session");

const router = express.Router();

router.route("/create-checkout-session").post(checkoutSession);
router.route("/session-status").get(sessionStatus);
module.exports = router;
