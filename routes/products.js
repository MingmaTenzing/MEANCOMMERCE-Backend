const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  smartPhone,
  headPhones,
  computers,
  accesssories,
  gamingConsoles,
  uploadProduct,
} = require("../controllers/products");

router.route("/").get(getAllProducts).post(uploadProduct);
router.route("/smartphones").get(smartPhone);
router.route("/headphones").get(headPhones);
router.route("/computers").get(computers);
router.route("/accessories").get(accesssories);
router.route("/gamingconsoles").get(gamingConsoles);

module.exports = router;
