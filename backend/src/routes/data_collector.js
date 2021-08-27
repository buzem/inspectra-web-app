"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const DataCollectorController = require("../controllers/data_collector");
const DataCollectorEventController = require("../controllers/data_collector_event");

router.get("/", middlewares.checkAuthentication, DataCollectorController.list); // List all data-collectors of signedin user
router.post(
     "/",
     middlewares.checkAuthentication,
     // middlewares.checkIsAdmin,
     DataCollectorController.create
); // Create a new data collector
router.get("/:id", middlewares.checkAuthentication, DataCollectorController.read); // Read a data collector by Id
router.get("/:id/events", middlewares.checkAuthentication, DataCollectorEventController.listEventsForCollectorId);
router.get(
  "/:id",
  middlewares.checkAuthentication,
  DataCollectorController.read
); // Read a data collector by Id
router.get(
  "/:id/events",
  middlewares.checkAuthentication,
  DataCollectorEventController.listEventsForCollectorId
);
router.get(
  "/:id/events/data/:path",
  middlewares.checkAuthentication,
  DataCollectorEventController.getDataCollectorEventData
);
router.get(
  "/:id/events/schema",
  middlewares.checkAuthentication,
  DataCollectorEventController.listSchemaForCollectorId
);
router.put(
     "/:id",
     middlewares.checkAuthentication,
     // middlewares.checkIsAdmin,
     DataCollectorController.update
);
router.delete(
     "/:id",
     middlewares.checkAuthentication,
     // middlewares.checkIsAdmin,
     DataCollectorController.remove
);

module.exports = router;
