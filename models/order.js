const mongoose = require("mongoose");

const order_schema = new mongoose.Schema({
  user_id: String,
  paymend_intent: String,
  charge_id: String,
  total_amount: Number,
  customer_email: String,
  customer_name: String,
  status: String,
  receipt_url: String,
});

module.exports = mongoose.model("Orders", order_schema);
