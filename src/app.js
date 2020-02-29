require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { NODE_ENV, CLIENT_ORIGIN, API_BASE_URL } = require("./config");
const morgan = require("morgan");
const helmet = require("helmet");
const allEntries = require("./store");

const app = express();

const morganSetting = NODE_ENV === "production" ? "tiny" : "dev";

app.use(morgan(morganSetting));
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get("/", (req, res) => {
  res.send(200, "Hello, Artlist!");
});

app.get("/list", (req, res) => {
  res.status(200).json(allEntries);
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
