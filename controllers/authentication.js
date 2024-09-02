const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { email, password, user_name } = req.body;
  const hasedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({
      email,
      password: hasedPassword,
      user_name,
    });
    await user.save();
    res.status(StatusCodes.CREATED).json({
      message: `user created successfully`,
      user,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const login = async (req, res) => {};

module.exports = { register, login };
