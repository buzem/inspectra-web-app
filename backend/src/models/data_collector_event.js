"use strict";

const mongoose = require("mongoose");

const opts = {
  toJSON: { virtuals: true },
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
};

// Define the data collector schema
const DataCollectorEventSchema = new mongoose.Schema(
  {
    dataCollectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data Collector",
      required: true,
    },
    timestamp: {
      type: Number,
      default: Math.floor(Date.now() / 1000),
      required: true,
    },
    statusCode: {
      type: Number,
      required: true,
    },
    responseTime: {
      type: Number,
      required: true,
    },
    responseSize: {
      type: Number,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  opts
);

DataCollectorEventSchema.set("versionKey", false);

// Export the Data Collector model
module.exports = mongoose.model(
  "Data Collector Event",
  DataCollectorEventSchema
);
