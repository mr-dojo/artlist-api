const express = require("express");
const allEntries = require("../store");
const ListService = require("./list-service");

const listRouter = express.Router();
const jsonParser = express.json();

listRouter
  .route("/")
  .get((req, res, next) => {
    ListService.getList(req.app.get("db"))
      .then(list => {
        res.status(200).json(list);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      title,
      description,
      medium,
      location,
      price,
      size,
      availability
    } = req.body;
    const newItem = {
      title,
      description,
      medium,
      location,
      price,
      size,
      availability
    };

    if (!newItem.title) {
      return res.status(400).json({
        error: { message: `Missing 'title' in request body` }
      });
    }

    ListService.insertItem(req.app.get("db"), newItem)
      .then(note => {
        res.status(201).json(note);
      })
      .catch(next);
  });

module.exports = listRouter;
