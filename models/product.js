const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "please provide the price"],
  },
  category: {
    type: String,
    enum: [
      "Computer & Laptop",
      "Smartphone",
      "Headphone",
      "Accessories",
      "Camera",
      "TV",
    ],
    message: "{VALUE} is not acceptable",

    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  stock: {
    type: Number,
    default: 10,
  },
  brand: {
    type: String,
  },
  sku: {
    type: Number,
    default: Math.floor(Math.random() * 10000000),
  },
  images: {
    type: Array,
  },
});
module.exports = mongoose.model("Product", productSchema);
