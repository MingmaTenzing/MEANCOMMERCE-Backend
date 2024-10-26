const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const dataURI = require("datauri");
const dURI = new dataURI();
const path = require("path");

const dataUri = (req) => {
  dURI.format(path.extname(req.file.originalname).toString(), req.file.buffer);
};

module.exports = { upload, dataUri };
