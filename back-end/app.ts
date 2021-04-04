const express = require("express");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
// const AuthRoute = require('./routes/authRoute')
import AuthRoute from "./routes/authRoute";
import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/nodeShop");
dotenv.config({ path: ".env" });
const port = process.env.PORT || 8080;
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
  res.status(error.status || 500);
  res.json({
    error: error,
    message: "not found",
  });
});
app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}/`);
});
