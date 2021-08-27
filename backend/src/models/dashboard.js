"use strict";

const mongoose = require("mongoose");

const opts = {
  toJSON: { virtuals: true },
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
};

const DashboardLayoutSchema = new mongoose.Schema({
  dashboardId: { type: mongoose.Schema.Types.ObjectId, ref: "Dashboard" },
  i: { type: mongoose.Schema.Types.ObjectId, ref: "Graph" },
  x: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  y: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  w: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  h: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  minW: {
    type: Number,
    default: 3,
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
});

// Define the data collector schema
const DashboardSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedByUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    graphs: {
      type: [String],
      required: true,
    },
    layout: [DashboardLayoutSchema],
  },
  opts
);

DashboardSchema.set("versionKey", false);

// Export the Data Collector model
module.exports = mongoose.model("Dashboard", DashboardSchema);
