const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));
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
app.listen(3000, () => {
  console.log("Server is Running on http://localhost:3000/");
});
