const express = require("express");
const app = express();
const productsRoute = require("./routes/products");
const port = 5000;
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

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
