const { StatusCodes } = require("http-status-codes");
const User = require("../models/user");

const fetch_user_details = async (req, res) => {
  const { userId, name } = req.user;
  try {
    const user = await User.findOne({ _id: userId });
    console.log(user);

    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
};

module.exports = {
  fetch_user_details,
};
