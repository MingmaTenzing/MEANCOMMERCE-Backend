const User = require("./../models/user");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const user = new User(req.body);
    console.log(req.body);
    await user.save();
    const token = user.createJWT();
    res.cookie("token", token, {
      // can only be accessed by server requests
      httpOnly: false,
      // path = where the cookie is valid
      path: "/",
      // domain = what domain the cookie is valid on

      // secure = only send cookie over https
      secure: false,
      // sameSite = only send cookie if the request is coming from the same origin
      sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
      // maxAge = how long the cookie is valid for in milliseconds
      maxAge: 3600000, // 1 hour
    });
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
      res.cookie("token", token, {
        // can only be accessed by server requests
        httpOnly: false,
        // path = where the cookie is valid
        path: "/",
        // domain = what domain the cookie is valid on

        // secure = only send cookie over https
        secure: false,
        // sameSite = only send cookie if the request is coming from the same origin
        sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
        // maxAge = how long the cookie is valid for in milliseconds
        maxAge: 3600000, // 1 hour
      });
      res.status(StatusCodes.OK).json({ user });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const session_check = async (req, res) => {
  const authCookie = req.cookies["token"];
  console.log(authCookie);
  if (authCookie == null) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "user unauthorized" });
  }
  try {
    const verfiy_jwt = jwt.verify(authCookie, process.env.JWT_SECRET);
    req.userId = verfiy_jwt.userId;
    req.userName = verfiy_jwt.name;
    res.status(StatusCodes.OK).json({
      message: "authorized",
      userId: verfiy_jwt.userId,
      name: verfiy_jwt.name,
    });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).re({ msg: "invalid token" });
  }
};

module.exports = { register, login, session_check };
