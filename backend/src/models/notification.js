"use strict";

const mongoose = require("mongoose");

const opts = {
  toJSON: { virtuals: true },
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
};

const FieldSchema = new mongoose.Schema({
  // name of actor
  path: { type: String, required: false },
  type: { type: String, required: false },
  indent: { type: Number, required: false },
});
FieldSchema.set("versionKey", false);
// Define the notification schema
const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updatedByUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
    },
    dataCollectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data Collector",
    },
    paused: {
      type: Boolean,
      required: true,
      default: false,
    },
    dataCollectorTitle: {
      type: String,
    },
    channel: {
      type: String,
      enum: ["EMAIL", "TWILIO"],
      required: true,
    },
    email: {
      type: String,
      required: false,
    },

    phone: {
      type: String,
      required: false,
    },

    rule: {
      type: String,
      enum: ["<", "<=", "==", ">=", ">"],
      required: true,
    },
    criticalvalue: {
      type: Number,
      required: true,
    },
    field: {
      type: FieldSchema,
      required: false,
    },
  },
  opts
);

NotificationSchema.set("versionKey", false);

// Export the Notification model
module.exports = mongoose.model("Notification", NotificationSchema);
