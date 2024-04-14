const getAllProducts = (req, res) => {
  res.send("all products page");
};

const uploadProduct = (req, res) => {
  console.log(req.body);
};
const smartPhone = (req, res) => {
  res.send("SmartPhone Category");
};
const headPhones = (req, res) => {
  res.send("headphone Category");
};
const computers = (req, res) => {
  res.send("computer Category");
};
const gamingConsoles = (req, res) => {
  res.send("gamingconsole Category");
};
const accesssories = (req, res) => {
  res.send("accessories Category");
};

module.exports = {
  smartPhone,
  computers,
  gamingConsoles,
  accesssories,
  headPhones,
  getAllProducts,
  uploadProduct,
};
