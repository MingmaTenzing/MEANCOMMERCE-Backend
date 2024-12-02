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
      secure: true,
      // sameSite = only send cookie if the request is coming from the same origin
      sameSite: "none", // "strict" | "lax" | "none" (secure must be true)
      // maxAge = how long the cookie is valid for in milliseconds
      maxAge: 86400000, // 24 hour
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
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json("user not found please register first");
    }
    const matchPassword = await user.comparePassword(password);
    if (!matchPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json("invalid credentials");
    } else {
      const token = user.createJWT();
      res.cookie("token", token, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "none",
      });
      res.status(StatusCodes.OK).json({ user });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const sign_out = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });

  res.status(StatusCodes.OK).json("cookies cleared");
};

const check_auth_sesion = async (req, res) => {
  const authCookie = req.cookies["token"];
  console.log(authCookie);
  console.log(req.user);

  if (authCookie == null) {
    return res.status(StatusCodes.UNAUTHORIZED).json("user unauthorized");
  }
  try {
    const verfiy_jwt = jwt.verify(authCookie, process.env.JWT_SECRET);
    if (verfiy_jwt) {
      console.log(verfiy_jwt.name, verfiy_jwt.userId);
      return res.status(StatusCodes.OK).json({
        userId: verfiy_jwt.userId,
        userName: verfiy_jwt.name,
      });
    }
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json("authentication invalid");
  }
};

module.exports = { register, login, sign_out, check_auth_sesion };
