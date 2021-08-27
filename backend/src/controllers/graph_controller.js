"use strict";

const GraphModel = require("../models/graph");
const DataCollectorEventController = require("./data_collector_event");
const EventData = require("../functions/eventData");

const getGraphWithData = async (graphId, userId) => {
  let graph = await GraphModel.findOne({
    _id: graphId,
    userId: userId,
  });

  // if no graph with id is found, return []
  if (!graph) {
    return;
  }

  // 1) load data from graph events from graph id
  // 2) read data according to specified path
  // 3) add to response data tag
  let result = graph._doc;
  let data = await EventData.getGraphData(graph.dataCollectorId, graph.path);
  result.graphData = data;
  return result;
};

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
    let newGraph = req.body;
    newGraph["userId"] = req.userId;

    let graph = await GraphModel.create(newGraph);

    // return created graph
    return res.status(201).json(graph);
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
    let graphId = req.params.id;
    // find a graph that has the id and is created by the user
    // returns null if the user has not created the graph
    let result = await getGraphWithData(graphId, req.userId);

    if (!result)
      return res.status(404).json({
        error: "Not Found",
        message: `Graph not found`,
      });
    // (graph.dataCollectorId);

    // return gotten graph
    return res.status(200).json(result);
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
    // find and update graph with id of user
    const filter = { _id: req.params.id, userId: req.userId };

    let updatedGraph = req.body;
    updatedGraph["updatedByUser"] = req.userId;

    let graph = await GraphModel.findOneAndUpdate(filter, updatedGraph, {
      new: true,
      runValidators: true,
    }).exec();

    if (graph == null) {
      return res.status(404).json({
        error: "Error",
        message:
          "graph not found. Either you are not logged-in, or the graph doesn't exist.",
      });
    }
    // return updated graph
    return res.status(200).json(graph);
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
    // find and remove graph
    const query = { _id: req.params.id, userId: req.userId };
    let result = await GraphModel.deleteOne(query);

    if (result.n !== 1) {
      return res.status(404).json({
        error: "Error",
        message:
          "Graph not found. Either you are not logged-in, or the Graph doesn't exist.",
      });
    }
    return res.status(200).json({
      message: `Graph with id${req.params.id} was deleted`,
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
    let result = await GraphModel.find({
      userId: req.userId,
    }).exec();

    // return gotten graphs
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
  getGraphWithData,
};
