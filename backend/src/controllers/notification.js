"use strict";

const NotificationModel = require("../models/notification");

const create = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  try {
    let NewNotification = req.body;
    NewNotification["userId"] = req.userId;
    let notification = await NotificationModel.create(NewNotification);
    return res.status(201).json(notification);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const read = async (req, res) => {
  try {
    let notificationId = req.params.id;
    // find a notification that has the id and is created by the user
    // returns null if the user has not created the notification
    let notification = await NotificationModel.findOne({
      _id: notificationId,
      userId: req.userId,
    });

    if (notification == null)
      return res.status(404).json({
        error: "Not Found",
        message: `Notification not found`,
      });

    return res.status(200).json(notification);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
};

const update = async (req, res) => {
  // check if the body of the request contains all necessary properties
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "The request body is empty",
    });
  }

  // handle the request
  try {
    // find and update notification with id of user
    const filter = { _id: req.params.id, userId: req.userId };

    let updatedNotification = req.body;
    updatedNotification["updatedByUser"] = req.userId;

    let notification = await NotificationModel.findOneAndUpdate(
      filter,
      updatedNotification,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    if (notification == null) {
      return res.status(404).json({
        error: "Error",
        message:
          "Notification not found. Either you are not logged-in, or the Notification doesn't exist.",
      });
    }
    return res.status(200).json(notification);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    const query = { _id: req.params.id, userId: req.userId };
    let result = await NotificationModel.deleteOne(query);

    if (result.n !== 1) {
      return res.status(404).json({
        error: "Error",
        message:
          "Notification not found. Either you are not logged-in, or the Notification doesn't exist.",
      });
    }
    return res.status(200).json({
      message: `Notification with id${req.params.id} was deleted`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const list = async (req, res) => {
  try {
    // if the user is no admin return that the user has not the rights for this action
    let result = await NotificationModel.find({
      userId: req.userId,
    }).exec();

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const listNotificationsForEventId = async (req, res) => {
  try {
    let eventId = req.params.id;
    // find a data collector that has the id and is created by the user
    // returns null if the user has not created the data collector
    let notifications = await NotificationModel.find({
      eventId: eventId,
    }).exec();

    return res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
};

const random = async (req, res) => {
  return res.status(200).json({ test: "test" });
};

module.exports = {
  create,
  read,
  remove,
  list,
  update,
  random,
};
