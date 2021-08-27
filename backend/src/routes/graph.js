"use strict";

const express = require("express");
const router = express.Router();

const middlewares = require("../middlewares");
const GraphController = require("../controllers/graph_controller");

router.get("/", middlewares.checkAuthentication, GraphController.list); // List all graphs of signedin user
router.post(
  "/",
  middlewares.checkAuthentication,
  // middlewares.checkIsAdmin,
  GraphController.create
); // Create a new Graph
router.get("/:id", middlewares.checkAuthentication, GraphController.read); // Read a graph by Id
router.put(
  "/:id",
  middlewares.checkAuthentication,
  // middlewares.checkIsAdmin,
  GraphController.update
);
router.delete(
  "/:id",
  middlewares.checkAuthentication,
  // middlewares.checkIsAdmin,
  GraphController.remove
); 

module.exports = router;
