"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const DataCollectorEventController = require("../controllers/data_collector_event");

router.get(
  "/",
  // middlewares.checkAuthentication,
  DataCollectorEventController.list
); // List all data-collectors of signedin user
router.post(
  "/",
  // middlewares.checkAuthentication,
  // middlewares.checkIsAdmin,
  DataCollectorEventController.create
); // Create a new data collector
router.get(
  "/:id",
  // middlewares.checkAuthentication,
  DataCollectorEventController.read
); // Read a data collector by Id

module.exports = router;
