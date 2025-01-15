const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
require("dotenv").config();

// const auth_checker = async (req, res, next) => {
//   const authCookie = req.cookies["token"];

//   if (authCookie == null && !req.user) {
//     return res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ msg: "user unauthorized" });
//   }
//   try {
//     const verfiy_jwt = jwt.verify(authCookie, process.env.JWT_SECRET);
//     const { userId, name } = verfiy_jwt;
//     req.user = { userId, name };
//     next();
//   } catch (error) {
//     res
//       .status(StatusCodes.UNAUTHORIZED)
//       .json({ msg: "authentication invalid" });
//   }
// };

const auth_checker = async (req, res, next) => {
  const authCookie = req.cookies["token"];
  console.log(authCookie, req.user);

  if (authCookie) {
    try {
      const verfiy_jwt = jwt.verify(authCookie, process.env.JWT_SECRET);
      const { userId, name } = verfiy_jwt;
      req.user = { userId, name };
      next();
    } catch (error) {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "authentication invalid" });
    }
  } else if (req.user) {
    next();
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json("user unauthorized");
  }

  // if (req.user) {
  //   next();
  // } else if (authCookie) {
  //   try {
  //     const verfiy_jwt = jwt.verify(authCookie, process.env.JWT_SECRET);
  //     const { userId, name } = verfiy_jwt;
  //     req.user = { userId, name };
  //     next();
  //   } catch (error) {
  //     res
  //       .status(StatusCodes.UNAUTHORIZED)
  //       .json({ msg: "authentication invalid" });
  //   }
  // } else {
  //   return res.status(StatusCodes.UNAUTHORIZED).json("user unauthorized");
  // }
};

module.exports = auth_checker;
