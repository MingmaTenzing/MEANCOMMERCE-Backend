const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  try {
    console.log(page, limit);
    const products = await Product.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    console.log(products.length);
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const shopProducts = async (req, res) => {
  res.status(StatusCodes.OK).json("working");
};

const getSingleProduct = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide the product ID" });
  }

  try {
    const product = await Product.findOne({ _id: productId });
    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    if (error.name == "CastError") {
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ message: "Product not found with id " + productId });
    }
  }

  // const product = await Product.findOne({ _id: productId });
  // if (!product) {
  //   res
  //     .status(StatusCodes.NOT_FOUND)
  //     .json({ msg: "product not found with id " + productId });
  // }
  // res.json({ product });
};

const uploadProduct = async (req, res) => {
  const product = await Product.create(camera);
  if (!product) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
  res.status(StatusCodes.OK).json({
    product,
  });
};

const smartPhone = async (req, res) => {
  const smartPhones = await Product.find({ category: "Smartphone" });
  if (!smartPhones) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "Product not Found",
    });
  }
  res.status(StatusCodes.OK).json(smartPhones);
};

const headPhones = async (req, res) => {
  const products = await Product.find({ category: "Headphone" });
  if (!products) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "Product not Found",
    });
  }
  res.status(StatusCodes.OK).json(products);
};
const computers = async (req, res) => {
  const products = await Product.find({ category: "Computer & Laptop" });
  if (!products) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "Product not Found",
    });
  }
  res.status(StatusCodes.OK).json(products);
};

const accesssories = async (req, res) => {
  const products = await Product.find({ category: "Accessories" });
  if (!products) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "Product not Found",
    });
  }
  res.status(StatusCodes.OK).json(products);
};

module.exports = {
  smartPhone,
  computers,
  accesssories,
  headPhones,
  getAllProducts,
  uploadProduct,
  getSingleProduct,
  shopProducts,
};
