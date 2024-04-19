const Product = require("../models/product");
const headphones = require("../headphone.json");
const tv = require("../tv.json");
const { StatusCodes } = require("http-status-codes");
const camera = require("../camera.json");
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const uploadProduct = async (req, res) => {
  const product = await Product.create(camera);
  res.status(StatusCodes.OK).json({
    product,
  });
  res.json({ product }); // const product = await Product.create(smartphones);
  // res.status(200).json({
  //   product,
  // });
  // res.json({ product });
};
const smartPhone = async (req, res) => {
  const smartPhones = await Product.find({ category: "Smartphone" });
  res.json(smartPhones);
};
const headPhones = (req, res) => {
  res.send("headphone Category");
};
const computers = (req, res) => {
  res.send("computer Category");
};
const gamingConsoles = (req, res) => {
  res.send("gamingconsole Category");
};
const accesssories = (req, res) => {
  res.send("accessories Category");
};

module.exports = {
  smartPhone,
  computers,
  gamingConsoles,
  accesssories,
  headPhones,
  getAllProducts,
  uploadProduct,
};
