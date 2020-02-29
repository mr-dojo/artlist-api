const express = require("express");
const allEntries = require("../store");
const ListService = require("./list-service");

const listRouter = express.Router();

listRouter.route("/").get((req, res, next) => {
  ListService.getList(req.app.get("db"))
    .then(list => {
      res.status(200).json(list);
    })
    .catch(next);
});

module.exports = listRouter;
