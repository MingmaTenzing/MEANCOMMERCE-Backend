const Product = require("../models/product");
const headphones = require("../headphone.json");

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const uploadProduct = async (req, res) => {
  const product = await Product.create(headphones);
  res.status(200).json({
    product,
  });
  res.json({ product }); // const product = await Product.create(smartphones);
  // res.status(200).json({
  //   product,
  // });
  // res.json({ product });
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
