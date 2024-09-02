const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: "string",
    required: true,
    index: { unique: true },
  },
  password: {
    type: "string",
    required: true,
  },
  user_name: {
    type: "String",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
