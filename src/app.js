require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");

const app = express();

const morganSetting = NODE_ENV === "production" ? "tiny" : "dev";

app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.send(200, "Hello, Artlist!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "Server error" } };
  } else {
    console.log(error);
    response = { error: { message: error.message, error } };
  }
  res.status(500).json(response);
});

module.exports = app;
