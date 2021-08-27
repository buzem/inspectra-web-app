"use strict";

const express = require("express");
const helmet = require("helmet");
const path = require("path");

const middlewares = require("./middlewares");

const auth = require("./routes/auth");
const data_collector = require("./routes/data_collector");
const data_collector_event = require("./routes/data_collector_event");
const dashboard = require("./routes/dashboard");
const notification = require("./routes/notification");
const graph = require("./routes/graph");

const api = express();

api.set("port", process.env.PORT);

// Adding Basic Middlewares
api.use(helmet());
api.use(express.static(path.resolve(__dirname, "../../frontend/build")));
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);

// API routes
api.use("/api/auth", auth);
api.use("/api/data-collector", data_collector);
api.use("/api/data-collector-event", data_collector_event);
api.use("/api/notification", notification);
api.use("/api/dashboard", dashboard);
api.use("/api/graph", graph);

api.get("*", function (request, response) {
  response.sendFile(
    path.resolve(__dirname, "../../frontend/build", "index.html")
  );
});

module.exports = api;
