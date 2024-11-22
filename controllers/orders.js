const Orders = require("../models/order");
const { StatusCodes } = require("http-status-codes");

const get_recent_orders = async (req, res) => {
  try {
    const findOrders = await Orders.find({ user_id: req.user.userId }).sort({
      created_at: -1,
    });
    res.status(StatusCodes.OK).json(findOrders);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = { get_recent_orders };
