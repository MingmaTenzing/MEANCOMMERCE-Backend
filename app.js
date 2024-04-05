//required default
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
const productsRoute = require("./routes/products");
const categoriesRoute = require("./routes/categories");

//port
const port = 5000;

//DB
const connectDB = require("./db/connect");

app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/products", productsRoute);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => console.log("listening on port " + port));
  } catch (error) {
    console.log(error);
  }
};
start();
