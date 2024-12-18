const order = require("../models/order");
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

const get_order_details = async (req, res) => {
  if (!req.query.order_id) {
    return res.status(StatusCodes.BAD_REQUEST).json("please provide order id ");
  }
  try {
    const findOrder_details = await Orders.find({ _id: req.query.order_id });
    res.status(StatusCodes.OK).json(findOrder_details[0]);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = { get_recent_orders, get_order_details };
