const express = require("express");
const router = express.Router();

const {
  get_recent_orders,
  get_order_details,
} = require("../controllers/orders");

router.route("/get_recent_orders").get(get_recent_orders);
router.route("/get-order-details").get(get_order_details);

module.exports = router;
