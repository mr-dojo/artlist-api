const express = require("express");
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
      .then(item => {
        res.status(201).json(item);
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
  .get((req, res, next) => res.status(200).json(res.item))
  .patch(jsonParser, (req, res, next) => {
    const {
      title,
      description,
      medium,
      location,
      price,
      size,
      availability
    } = req.body;
    allItemDetails = {
      title,
      description,
      medium,
      location,
      price,
      size,
      availability
    };

    // filter out undefined request values
    const deleteEmptyItems = () => {
      const keys = Object.keys(allItemDetails);
      for (let i = 0; i < keys.length; i++) {
        if (allItemDetails[keys[i]] == undefined) {
          delete allItemDetails[keys[i]];
        }
      }
    };
    deleteEmptyItems();

    // make sure there is at least one value being updated
    const itemDetailsLength = Object.keys(allItemDetails).length;
    if (itemDetailsLength === 0) {
      return res.status(400).json({
        error: {
          message: `request must contain one of either: title, description, medium, location, price, size, availability`
        }
      });
    }

    ListService.updateItem(
      req.app.get("db"),
      req.params.item_id,
      allItemDetails
    )
      .then(item => {
        res.status(201).json(item);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    ListService.deleteItem(req.app.get("db"), req.params.item_id).then(r => {
      res.status(204).end();
    });
  });

module.exports = listRouter;
