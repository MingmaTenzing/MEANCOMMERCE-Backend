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
  try {
    const products = await Product.find(req.body);

    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const getCategoryProducts = async (req, res) => {
  console.log(req.body);
  try {
    const products = await Product.find(req.body);
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
const getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  console.log(productId);

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
};

const uploadProduct = async (req, res) => {
  // const product = await Product.create(camera);
  // if (!product) {
  //   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //     message: "Internal Server Error",
  //   });
  // }
  // res.status(StatusCodes.OK).json({
  //   product,
  // });
};

module.exports = {
  getAllProducts,
  uploadProduct,
  getSingleProduct,
  getCategoryProducts,
  shopProducts,
};
