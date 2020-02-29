const express = require("express");
const allEntries = require("../store");

const listRouter = express.Router();

listRouter.route("/").get((req, res, next) => {
  res.status(200).json(allEntries);
});

module.exports = listRouter;
