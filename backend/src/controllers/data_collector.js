"use strict";

const DataCollectorModel = require("../models/data_collector");

const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  // handle the request
  try {
    let NewDataCollector = req.body;
    NewDataCollector["userId"] = req.userId;

    let dataCollector = await DataCollectorModel.create(NewDataCollector);

    return res.status(201).json(dataCollector);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const read = async (req, res) => {
  try {
    let dataCollectorId = req.params.id;
    // find a data collector that has the id and is created by the user
    // returns null if the user has not created the data collector
    let dataCollector = await DataCollectorModel.findOne({
      _id: dataCollectorId,
      userId: req.userId,
    });

    if (dataCollector == null)
      return res.status(404).json({
        error: "Not Found",
        message: `Data Collector not found`,
      });

    return res.status(200).json(dataCollector);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  // handle the request
  try {
    // find and update data collector with id of user
    const filter = { _id: req.params.id, userId: req.userId };

    let updatedDataCollector = req.body;
    updatedDataCollector["updatedByUser"] = req.userId;

    let dataCollector = await DataCollectorModel.findOneAndUpdate(
      filter,
      updatedDataCollector,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    if (dataCollector == null) {
      return res.status(404).json({
        error: "Error",
        message:
          "Data Collector not found. Either you are not logged-in, or the Data Collector doesn't exist.",
      });
    }

    return res.status(200).json(dataCollector);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const query = { _id: req.params.id, userId: req.userId };
    let result = await DataCollectorModel.deleteOne(query);

    console.log(result);

    if (result.n !== 1) {
      return res.status(404).json({
        error: "Error",
        message:
          "Data Collector not found. Either you are not logged-in, or the Data Collector doesn't exist.",
      });
    }

    return res.status(200).json({
      message: `Data Collector with id${req.params.id} was deleted`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const list = async (req, res) => {
  try {
    // if the user is no admin return that the user has not the rights for this action
    let result = await DataCollectorModel.find({
      userId: req.userId,
    }).exec();

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

module.exports = {
  create,
  read,
  update,
  remove,
  list,
};
