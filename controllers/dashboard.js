const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const fetch_user_details = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user.userId, req.user.name);
};

module.exports = {
  fetch_user_details,
};
