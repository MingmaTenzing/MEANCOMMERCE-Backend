const cloudinary = require("cloudinary").v2;
const { StatusCodes } = require("http-status-codes");
const { dataUri } = require("../multer-config/multer-config");
cloudinary.config({
  cloud_name: "dnusuubi9",
  api_key: "782767779811413",
  api_secret: process.env.CLOUDINARY_SECRET_KEY, // Click 'View API Keys' above to copy your API secret
});

const uploadImage = async (req, res) => {
  console.log(req.file);

  res.status(StatusCodes.OK).json("working uploading");
  // if (req.file) {
  //   const file = dataUri(req).content;
  //   return cloudinary.uploader
  //     .upload(file)
  //     .then((result) => {
  //       const image = result.url;
  //       return res.status(StatusCodes.OK).json(image);
  //     })
  //     .catch((error) =>
  //       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  //     );
  // }
  //   console.log(req.file);
  //   try {
  //     const result = await cloudinary.uploader.upload(req.file, {});
  //     res.status(200).json(result.secure_url);
  //   } catch (error) {
  //     res.status(400).send(error);
  //   }
};

module.exports = {
  uploadImage,
};
