const express = require("express");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
// const AuthRoute = require('./routes/authRoute')
import AuthRoute from "./routes/authRoute";
import ProductRoute from "./routes/productRoute";
import CartRoute from "./routes/cartRoute";
import OrderRoute from "./routes/orderRoute";
import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/nodeShop");
dotenv.config({ path: ".env" });
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/auth", AuthRoute);
app.use("/product", ProductRoute);
app.use("/cart", CartRoute);
app.use("/order", OrderRoute);

app.use("/hello", (req, res, next) => {
  res.status(200);
  res.json({
    message: "hello how are you",
  });
});
app.use((req, res, next) => {
  const error = new Error("Not Found");
  // error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);
  res.json({
    error: error,
    message: "not found",
  });
});


export { app };
