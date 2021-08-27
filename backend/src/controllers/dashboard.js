"use strict";
const DashboardModel = require("../models/dashboard");
const GraphController = require("./graph_controller");

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
    let NewDasboard = req.body;
    NewDasboard["userId"] = req.userId;

    let dashboard = await DashboardModel.create(NewDasboard);

    // todo: abstract into helper function
    // load all Graph Data and append to result
    let allGraphData = [];
    for (const graphId of dashboard.graphs) {
      let graphData = await GraphController.getGraphWithData(
        graphId,
        req.userId
      );

      allGraphData.push(graphData);
    }

    let result = dashboard._doc;
    result.graphData = allGraphData;

    return res.status(201).json(result);
    // return res.status(201).json(dashboard);
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
    let dashboardId = req.params.id;
    // find a dashboard that has the id and is created by the user
    // returns null if the user has not created the dashboard
    let dashboard = await DashboardModel.findOne({
      _id: dashboardId,
      userId: req.userId,
    });

    if (dashboard == null)
      return res.status(404).json({
        error: "Not Found",
        message: `Dashboard not found`,
      });

    // load all Graph Data and append to result
    let allGraphData = [];
    for (const graphId of dashboard.graphs) {
      let graphData = await GraphController.getGraphWithData(
        graphId,
        req.userId
      );

      allGraphData.push(graphData);
    }

    let result = dashboard._doc;
    result.graphData = allGraphData;

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
    // find and update dashboard with id of user
    const filter = { _id: req.params.id, userId: req.userId };

    let updatedDashboard = req.body;
    updatedDashboard["updatedByUser"] = req.userId;

    let dashboard = await DashboardModel.findOneAndUpdate(
      filter,
      updatedDashboard,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    if (dashboard == null) {
      return res.status(404).json({
        error: "Error",
        message:
          "Dashboard not found. Either you are not logged-in, or the Dashboard doesn't exist.",
      });
    }
    let allGraphData = [];
    for (const graphId of dashboard.graphs) {
      let graphData = await GraphController.getGraphWithData(
        graphId,
        req.userId
      );

      allGraphData.push(graphData);
    }

    let result = dashboard._doc;
    result.graphData = allGraphData;

    return res.status(200).json(result);
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
    let result = await DashboardModel.deleteOne(query);

    if (result.n !== 1) {
      return res.status(404).json({
        error: "Error",
        message:
          "Dashboard not found. Either you are not logged-in, or the Dashboard doesn't exist.",
      });
    }
    return res.status(200).json({
      message: `Dashboard with id${req.params.id} was deleted`,
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
    let result = await DashboardModel.find({
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
