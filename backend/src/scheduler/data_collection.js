"use strict";
const https = require("https");
const axios = require("axios");

const DataCollectorModel = require("../models/data_collector");
const DataCollectorEventModel = require("../models/data_collector_event");
const Trigger = require("../functions/notifications");

const ingestDataCollectionEvent = async (data) => {
  // Ingest the data collection event into the MongoDB
  DataCollectorEventModel.create(data);
  Trigger.triggerNotification(data);
};

const getRequestDataCollection = async (dataCollector) => {
  // Set a start time to measure the request duration
  var start_ts = Date.now();

  // Make get request to endpoint using axios
  try {
    var data = await axios
      .get(dataCollector["endpoint"])
      .then(function (res) {
        return {
          dataCollectorId: dataCollector["id"],
          timestamp: Math.round(Date.now() / 1000), // Current unix timestamp
          statusCode: res.status, // HTTP Status
          responseTime: Date.now() - start_ts, // Response time in ms
          // responseSize: Number(res.headers["content-length"]), // Response size in Bytes
          responseSize: res.data
            ? new TextEncoder().encode(String(res.data)).length
            : 0,
          data: res.data,
        };
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          return {
            dataCollectorId: dataCollector["id"],
            timestamp: Math.round(Date.now() / 1000),
            statusCode: error.response.status, // Error Code
            responseTime: Date.now() - start_ts,
            responseSize: 0,
            data: {},
          };
        } else if (error.request) {
          // The request was made but no response was received
          return {
            dataCollectorId: dataCollector["id"],
            timestamp: Math.round(Date.now() / 1000),
            statusCode: 503, // Service Unavailable Error
            responseTime: Date.now() - start_ts,
            responseSize: 0,
            data: {},
          };
        } else {
          // Something happened in setting up the request that triggered an Error
          return {
            dataCollectorId: dataCollector["id"],
            timestamp: Math.round(Date.now() / 1000),
            statusCode: 600, // Inspectra Internal Error
            responseTime: Date.now() - start_ts,
            responseSize: 0,
            data: {},
          };
        }
      });
  } catch {
    var data = {
      dataCollectorId: dataCollector["id"],
      timestamp: Math.round(Date.now() / 1000),
      statusCode: 600, // Inspectra Internal Error
      responseTime: Date.now() - start_ts,
      responseSize: 0,
      data: {},
    };
  }

  // Forward the data collection event to the ingestion function
  ingestDataCollectionEvent(data);
};

const postRequestDataCollection = async (dataCollector) => {
  // Set a start time to measure the request duration
  var start_ts = Date.now();

  // parse the provided header to json, catch
  var header = {};
  try {
    header = JSON.parse(dataCollector["header"]);
  } catch {}

  // parse the provided body to json, catch
  var body = {};
  try {
    body = JSON.parse(dataCollector["body"]);
  } catch {}

  // Make post request to endpoint using axios
  try {
    var data = await axios
      .post(dataCollector["endpoint"], body, { headers: header })
      .then(function (res) {
        return {
          dataCollectorId: dataCollector["id"],
          timestamp: Math.round(Date.now() / 1000), // Current unix timestamp
          statusCode: res.status, // HTTP Status
          responseTime: Date.now() - start_ts, // Response time in ms
          //   responseSize: Number(), // Response size in Bytes
          responseSize: res.data
            ? new TextEncoder().encode(String(res.data)).length
            : 0,
          data: res.data,
        };
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          return {
            dataCollectorId: dataCollector["id"],
            timestamp: Math.round(Date.now() / 1000),
            statusCode: error.response.status, // Error Code
            responseTime: Date.now() - start_ts,
            responseSize: 0,
            data: {},
          };
        } else if (error.request) {
          // The request was made but no response was received
          return {
            dataCollectorId: dataCollector["id"],
            timestamp: Math.round(Date.now() / 1000),
            statusCode: 503, // Service Unavailable Error
            responseTime: Date.now() - start_ts,
            responseSize: 0,
            data: {},
          };
        } else {
          // Something happened in setting up the request that triggered an Error
          return {
            dataCollectorId: dataCollector["id"],
            timestamp: Math.round(Date.now() / 1000),
            statusCode: 600, // Inspectra Internal Error
            responseTime: Date.now() - start_ts,
            responseSize: 0,
            data: {},
          };
        }
      });
  } catch {
    var data = {
      dataCollectorId: dataCollector["id"],
      timestamp: Math.round(Date.now() / 1000),
      statusCode: 600, // Inspectra Internal Error
      responseTime: Date.now() - start_ts,
      responseSize: 0,
      data: {},
    };
  }
  // Forward the data collection event to the ingestion function
  ingestDataCollectionEvent(data);
};

const triggerRequests = async (trigger) => {
  // Load all data collectors from the MongoDB
  let dataCollectors = await DataCollectorModel.find({
    frequency: trigger,
  }).exec();

  // Execute the requests asynchronously
  for (var i in dataCollectors) {
    // For GET requests
    if (!dataCollectors[i]["paused"]) {
      if (dataCollectors[i]["method"] == "GET") {
        getRequestDataCollection(dataCollectors[i]);
      }
      // For GET requests
      else if (dataCollectors[i]["method"] == "POST") {
        postRequestDataCollection(dataCollectors[i]);
      }
      // Method not-available case
      else {
        console.log(
          "INFO: The data collection method " +
            dataCollectors[i]["method"] +
            " is not implemented yet."
        );
      }
    }
  }
};

module.exports = {
  triggerRequests,
};
