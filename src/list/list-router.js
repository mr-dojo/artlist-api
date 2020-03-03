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

listRouter
  .route("/:item_id")
  .all((req, res, next) => {
    ListService.getById(req.app.get("db"), req.params.item_id)
      .then(item => {
        if (!item) {
          return res.status(404).json({
            error: { message: `item doesn't exist` }
          });
        }
        res.item = item;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => res.status(200).json(res.item));

module.exports = listRouter;
