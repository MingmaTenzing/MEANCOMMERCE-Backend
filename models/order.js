const mongoose = require("mongoose");

const order_schema = new mongoose.Schema({
  line_items: Array,
  user_id: String,
  paymend_intent: String,
  charge_id: String,
  total_amount: Number,
  customer_email: String,
  customer_name: String,
  status: String,
  receipt_url: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Orders", order_schema);
