const express = require("express");
const router = express.Router();
const getAllCategories = require("../controllers/categories");

router.route("/").get(getAllCategories);

module.exports = router;
