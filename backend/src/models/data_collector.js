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
const DataCollectorSchema = new mongoose.Schema(
     {
          userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          updatedByUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          title: {
               type: String,
               required: true,
          },
          frequency: {
               type: String,
               required: true,
          },
          paused: {
               type: Boolean,
               required: true,
               default: false,
          },
          endpoint: {
               type: String,
               required: true,
          },
          method: {
               type: String,
               // role can only take the value "member" and "admin"
               enum: ["GET", "POST"],
               // if not specified the role member is choosen
               default: "GET",
          },
          body: {
               type: String,
               required: false,
          },
          header: {
               type: String,
               required: false,
          },
          paths: {
               type: String,
               required: false,
          },
     },
     opts
);

DataCollectorSchema.set("versionKey", false);

// Export the Data Collector model
module.exports = mongoose.model("Data Collector", DataCollectorSchema);
