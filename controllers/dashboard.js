const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const fetch_user_details = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

module.exports = {
  fetch_user_details,
};
