const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/image-handler");

router.route("/").post(uploadImage);

module.exports = router;
