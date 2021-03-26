const express = require("express");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });
const port = process.env.PORT || 8080;
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());


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
  });
});
app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}/`);
});
