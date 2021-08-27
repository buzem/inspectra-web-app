"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const NotificationController = require("../controllers/notification");

router.get("/", middlewares.checkAuthentication, NotificationController.list); // List all data-collectors of signedin user
router.post(
  "/",
  middlewares.checkAuthentication,
  NotificationController.create
);

router.get("/random", NotificationController.random);

router.get(
  "/:id",
  middlewares.checkAuthentication,
  NotificationController.read
);

router.delete(
  "/:id",
  middlewares.checkAuthentication,
  // middlewares.checkIsAdmin,
  NotificationController.remove
);

router.put(
  "/:id",
  middlewares.checkAuthentication,
  // middlewares.checkIsAdmin,
  NotificationController.update
);

module.exports = router;
