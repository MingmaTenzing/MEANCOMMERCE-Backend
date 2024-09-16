const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(StatusCodes.UNAUTHORIZED).json("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  

  try {
    const decode_jwt = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decode_jwt.userId,
      name: decode_jwt.name,
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
  }
};

module.exports = auth;
