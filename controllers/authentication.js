const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { email, password, user_name } = req.body;
  try {
    const user = new User(req.body);
    await user.save();
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      message: `user created successfully`,
      user,
      token,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const matchPassword = await user.comparePassword(password);
    if (!matchPassword) {
      res.status(StatusCodes.UNAUTHORIZED).json("invalid credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ token });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = { register, login };
