const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const auth = async (req, res, next) => {
  const authCookie = req.cookies["authCookie"];
  if (authCookie == null) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "user unauthorized" });
  }
  try {
    const verfiy_jwt = jwt.verify(authCookie, process.env.JWT_SECRET);
    req.userId = verfiy_jwt.userId;
    req.userName = verfiy_jwt.name;
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "invalid token" });
  }
};

module.exports = auth;
