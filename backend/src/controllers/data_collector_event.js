"use strict";

const DataCollectorEventModel = require("../models/data_collector_event");
const EventData = require("../functions/eventData");
const { listenerCount } = require("../models/data_collector_event");

const getParsedEventData = async (req, res) => {
  // function retrieveDataPoint(doc, path) {}
  console.log("test");
  let dataCollectorId = req.params.id;
  let path = req.params.path;

  if (!dataCollectorId || !path) {
    return res.status(500).json({
      error: "No Data Collector ID or Path",
      message: err.message,
    });
  }

  let results = await EventData.getGraphData(dataCollectorId, path);
  return res.status(200).json(results);
};

// const getParsedEventData = async (dataCollectorId, path = undefined) => {
//   let results = await EventData.getGraphData(dataCollectorId, path);
//   return results;
// };

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
    let dataCollectorEvent = await DataCollectorEventModel.create(req.body);

    return res.status(201).json(dataCollectorEvent);
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
    let dataCollectorEvents = await DataCollectorEventModel.find({}).exec();

    return res.status(200).json(dataCollectorEvents);
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
    let dataCollectorEventId = req.params.id;
    // find a data collector that has the id and is created by the user
    // returns null if the user has not created the data collector
    let dataCollectorEvent = await DataCollectorEventModel.findOne({
      _id: dataCollectorEventId,
    });

    if (dataCollectorEvent == null)
      return res.status(404).json({
        error: "Not Found",
        message: `Data Collector Event not found`,
      });

    return res.status(200).json(dataCollectorEvent);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const listEventsForCollectorId = async (req, res) => {
  try {
    let dataCollectorId = req.params.id;

    // Load the data collector events for the respective data collector
    let dataCollectorEvents = await EventData.getDCEventsByDCID(
      dataCollectorId
    );
    return res.status(200).json(dataCollectorEvents);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const listSchemaForCollectorId = async (req, res) => {
  try {
    let dataCollectorId = req.params.id;

    // Load the data collector events for the respective data collector
    let dataCollectorEvents = await EventData.getDCEventsByDCID(
      dataCollectorId
    );

    if (dataCollectorEvents.length == 0) {
      let error = {
        status: 404,
        code: "NO_EVENTS",
        error: "No Data Collection Events found.",
        details:
          "We did not find any events for your data collector. Please ensure the data collector is set-up and able to collect data.",
      };
      res.status(404).json(error);
    }
    // Custom flatten function that returns the type of each key in a nested dictionary.
    // Can handle lists, nested dicts and all arbitray data types.
    function flatten(obj, suffix, ans) {
      for (var x in obj) {
        var key;
        if (suffix != "") key = suffix + "." + x;
        else key = x;
        if (typeof obj[x] === "object") {
          if (obj[x] instanceof Array) {
            ans[key] = "list";
            flatten(obj[x][0], key, ans);
          } else {
            ans[key] = "dict";
            flatten(obj[x], key, ans);
          }
        } else {
          ans[key] = typeof obj[x];
        }
      }
    }

    let schema = {};
    flatten(dataCollectorEvents.slice(-1).pop()["data"], "", schema);

    // Transform the schema dictionary into a key-value array to display in a dropdown in the frontend
    let schemaArray = [];
    for (var i in schema) {
      // Return the first letter of the data type as uppercase
      schemaArray.push({
        path: i,
        type: schema[i].charAt(0).toUpperCase() + schema[i].slice(1),
        indent: (i.match(/[.]/g) || []).length,
        indentKey: i.split(".").slice(-1)[0],
      });
    }

    if (schemaArray.length > 0) {
      return res.status(200).json(schemaArray);
    } else {
      let error = {
        status: 404,
        error: {
          code: "EMPTY_SCHEMA",
          title: "Schema not found",
          dataCollectorId: dataCollectorId,
          details:
            "Unable to retrieve the schema for your data collector. Please check if the data collector already collected valid collection events.",
        },
      };
      res.status(404).json(error);
    }
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
  list,
  listEventsForCollectorId,
  listSchemaForCollectorId,
  getDataCollectorEventData: getParsedEventData,
};
