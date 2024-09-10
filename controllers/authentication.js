const User = require("./../models/user");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(req.body);
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
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "user not found please register first" });
    }
    const matchPassword = await user.comparePassword(password);
    if (!matchPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json("invalid credentials");
    } else {
      const token = user.createJWT();
      res.status(StatusCodes.OK).json({ token });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const session_check = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Token Invalid, please login again" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const verfiy_jwt = jwt.verify(token, process.env.JWT_SECRET);
    res.status(StatusCodes.OK).json({
      message: "authorized",
      userId: verfiy_jwt.userId,
      name: verfiy_jwt.name,
    });
  } catch (error) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid Authenticatoin" });
  }
};

module.exports = { register, login, session_check };
