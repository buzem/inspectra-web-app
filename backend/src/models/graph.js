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
const GraphSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedByUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dataCollectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data Collector",
      required: true,
    },
    type: {
      type: String,
      enum: ["bar", "line", "area", "metric"],
      required: true,
    },
    color: {
      type: String,
      default: "#00FF00",
    },
    path: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    yAxisTitle: {
      type: String,
      required: true,
    },
  },
  opts
);

GraphSchema.set("versionKey", false);

// Export the Data Collector model
module.exports = mongoose.model("Graph", GraphSchema);
