"use strict";

const http = require("http");
const mongoose = require("mongoose");

const api = require("./src/api");
const config = require("./src/config");

const cron = require("node-cron");
const scheduler = require("./src/scheduler/data_collection");

// Set the port to the API.
api.set("port", config.port);

//Create a http server based on Express
const server = http.createServer(api);

//Connect to the MongoDB database; then start the server
mongoose
    .connect(config.mongoURI)
    .then(() => server.listen(config.port))
    .catch(err => {
        console.log('Error connecting to the database', err.message);
        process.exit(err.statusCode);
    });

server.on('listening', () => {
    console.log(`API is running in port ${config.port}`);

    // Scheduler
    cron.schedule("* * * * *", () => {scheduler.triggerRequests("* * * * *")});
    cron.schedule("*/2 * * * *", () => {scheduler.triggerRequests("*/2 * * * *")});
    cron.schedule("*/5 * * * *", () => {scheduler.triggerRequests("*/5 * * * *")});
    cron.schedule("*/10 * * * *", () => {scheduler.triggerRequests("*/10 * * * *")});
    cron.schedule("*/15 * * * *", () => {scheduler.triggerRequests("*/15 * * * *")});
    cron.schedule("*/30 * * * *", () => {scheduler.triggerRequests("*/30 * * * *")});
    cron.schedule("0 * * * *", () => {scheduler.triggerRequests("0 * * * *")});
    cron.schedule("0 */2 * * *", () => {scheduler.triggerRequests("0 */2 * * *")});
    cron.schedule("0 */3 * * *", () => {scheduler.triggerRequests("0 */3 * * *")});
    cron.schedule("0 */6 * * *", () => {scheduler.triggerRequests("0 */6 * * *")});
    cron.schedule("0 */12 * * *", () => {scheduler.triggerRequests("0 */12 * * *")});
    cron.schedule("0 12 * * *", () => {scheduler.triggerRequests("0 12 * * *")});
    cron.schedule("0 12 * * 1", () => {scheduler.triggerRequests("0 12 * * 1")});
});

server.on("error", (err) => {
     console.log("Error in the server", err.message);
     process.exit(err.statusCode);
});
