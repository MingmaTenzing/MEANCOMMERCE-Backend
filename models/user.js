const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      userId: this._id,
      name: this.user_name,
      
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

userSchema.methods.comparePassword = async function (user_provided_password) {
  const isMatch = await bcrypt.compare(user_provided_password, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
