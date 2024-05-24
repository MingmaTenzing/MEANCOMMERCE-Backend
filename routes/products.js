const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  smartPhone,
  headPhones,
  computers,
  accesssories,
  uploadProduct,
  getSingleProduct,
  shopProducts,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(uploadProduct);
router.route("/shop").get(shopProducts);
router.route("/:id").get(getSingleProduct);
router.route("/smartphones").get(smartPhone);
router.route("/headphones").get(headPhones);
router.route("/computers").get(computers);
router.route("/accessories").get(accesssories);

module.exports = router;
