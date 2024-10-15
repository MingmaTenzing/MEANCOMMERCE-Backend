const express = require("express");
const router = express.Router();

const { get_recent_orders } = require("../controllers/orders");

router.route("/get_recent_orders").get(get_recent_orders);

module.exports = router;
