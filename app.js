//required default
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth_checker = require("./middleware/verifytoken");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const passport = require("passport");

const allowedOrigins = [
  "http://localhost:4200",
  "https://meancommerce.vercel.app",
];

require("dotenv").config();

// cors options
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "ming secret",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//express-file upload middleware
app.use(fileUpload({ useTempFiles: true }));

//routes
const productsRoute = require("./routes/products");
const categoriesRoute = require("./routes/categories");
const checkoutRoute = require("./routes/checkout");
const auth_route = require("./routes/auth");
const dashboard_route = require("./routes/dashboard");
const order_router = require("./routes/recent_orders");
const image_upload_route = require("./routes/upload-image");
const google_auth_route = require("./routes/google-auth.js");

//port
const port = process.env.PORT;

//DB
const connectDB = require("./db/connect");

app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/checkout", auth_checker, checkoutRoute);
app.use("/api/v1/dashboard", dashboard_route);
app.use("/api/v1/auth", auth_route);
app.use("/api/v1/orders", auth_checker, order_router);
app.use("/api/v1/upload-image", image_upload_route);

app.use("/auth/google", google_auth_route);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () => console.log("listening on port " + port));
  } catch (error) {
    console.log(error);
  }
};
start();
