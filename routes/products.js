const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getCategoryProducts,
  uploadProduct,
  getSingleProduct,
  shopProducts,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(shopProducts);
router.route("/upload").post(uploadProduct);
router.route("/shop").get(shopProducts);
router.route("/category-products").post(getCategoryProducts);
router.route("/:id").get(getSingleProduct);

module.exports = router;
