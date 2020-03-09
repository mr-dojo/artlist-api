require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { NODE_ENV, CLIENT_ORIGIN, API_BASE_URL } = require("./config");
const morgan = require("morgan");
const helmet = require("helmet");
const listRouter = require("./list/list-router");

const app = express();
const morganSetting = NODE_ENV === "production" ? "tiny" : "dev";

app.use(morgan(morganSetting));
app.use(helmet());
app.use(cors());
app.use("/list", listRouter);

app.get("/", (req, res) => {
  res.send(200, "Hello, Artlist!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  console.log(error);
  if (NODE_ENV === "production") {
    response = { error: { message: "Server error" } };
  } else {
    response = { error: { message: error.message, error } };
  }
  res.status(500).json(response);
});

module.exports = app;
