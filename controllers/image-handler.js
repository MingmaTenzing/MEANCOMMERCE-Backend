const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");

cloudinary.config({
  cloud_name: "dnusuubi9",
  api_key: "782767779811413",
  api_secret: process.env.CLOUDINARY_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

const uploadImage = async (req, res) => {
  if (!req.files) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json("please provide the image first");
  }
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "users",
      }
    );
    res.status(StatusCodes.OK).json({ image: result.secure_url });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  uploadImage,
};
