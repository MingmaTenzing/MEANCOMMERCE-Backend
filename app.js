const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

const start = () => {
  app.listen(port, () => {
    console.log("listening on port " + port);
  });
};
start();
