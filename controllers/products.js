const product = require("../models/product");
const Product = require("../models/product");
const products = require("../products.json");
const getAllProducts = (req, res) => {
  res.send("all products page");
};

const uploadProduct = async (req, res) => {
  const product = await Product.create(products);
  res.status(200).json({
    product,
  });
};
const smartPhone = (req, res) => {
  res.send("SmartPhone Category");
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
