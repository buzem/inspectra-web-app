"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const DashboardController = require("../controllers/dashboard");

router.get("/", middlewares.checkAuthentication, DashboardController.list); // List all data-collectors of signedin user
router.post(
  "/",
  middlewares.checkAuthentication,
  // middlewares.checkIsAdmin,
  DashboardController.create
); // Create a new data collector
router.get(
  "/:id",
  middlewares.checkAuthentication,
  DashboardController.read
);
router.put(
  "/:id",
  middlewares.checkAuthentication,
  // middlewares.checkIsAdmin,
  DashboardController.update
);
router.delete(
  "/:id",
  middlewares.checkAuthentication,
  // middlewares.checkIsAdmin,
  DashboardController.remove
);

module.exports = router;
