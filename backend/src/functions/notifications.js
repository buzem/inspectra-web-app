"use strict";

const fs = require("fs");
const NotificationModel = require("../models/notification");
const Parsing = require("./parsing");
const ejs = require("ejs");
const juice = require("juice");
const { htmlToText } = require("html-to-text");

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "inspectra.notification.service@gmail.com",
    pass: "321asd321",
  },
});

const accountSid = "AC775df112839359f6e3c0e06dcc2c29d2";
const authToken = "7965ab45914d6556ed17261641f8eda0";
const client = require("twilio")(accountSid, authToken);

const convertRuletoString = (rule) => {
  switch (rule) {
    case "<":
      return "less than";
    case "<=":
      return "less than or equal to";
    case "==":
      return "equal";
    case ">=":
      return "greater or equal to";
    case ">":
      return "greater than";
  }
};

const getNotificationsForCollectorId = async (dataCollectorId) => {
  let notifications = await NotificationModel.find({
    dataCollectorId: dataCollectorId,
  })
    .limit(50)
    .exec();

  return notifications;
};

const checkThresholdSendEmail = async (
  data,
  rule,
  threshold,
  email,
  pathname,
  title,
  channel,
  phone
) => {
  let evalres = eval(data + rule + threshold.toString());
  if (evalres) {
    const rule_as_string = convertRuletoString(rule);
    const templateVars = {
      rule: rule_as_string,
      threshold: threshold,
      pathname: pathname,
      data: data,
    };

    if (channel === "EMAIL") {
      const templatePath = __dirname + `/../templates/notify.html`;

      let options = {};

      if (fs.existsSync(templatePath)) {
        const template = fs.readFileSync(templatePath, "utf-8");
        const html = ejs.render(template, templateVars);
        const text = htmlToText(html);
        const htmlWithStylesInlined = juice(html);

        options = {
          to: email,
          from: "inspectra.notification.service@gmail.com",
          subject: "Notification from " + title,
          templateVars: templateVars,
          html: htmlWithStylesInlined,
          text: text,
        };
      }
      transporter.sendMail(options, function (err) {
        console.log("Email sent to " + email + " for " + title);
        if (err) {
          console.log(err);
        }
      });
    } else if (channel === "TWILIO") {
      let sms_body =
        "Dear Inspectra User,\n" +
        "we are sending this message because the value for " +
        pathname +
        " is currently " +
        rule_as_string +
        " " +
        threshold +
        ", as it reached " +
        data +
        ".\n Therefore it surpasses the threshold value you set in your Notification Triggers. \n" +
        "Yours sincerely,\n" +
        "The Inspectra Team";

      if (phone === "+4915750252976" || phone === "+4915142505565") {
        const links = [
          "https://urlzs.com/qGfk",
          "https://urlzs.com/dem7J",
          "https://urlzs.com/jdfPs",
          "https://urlzs.com/KLDp3",
        ];
        // get random index value
        const randomIndex = Math.floor(Math.random() * links.length);

        // get random item
        const link = links[randomIndex];

        let rndInt = Math.random() * (45 - 10) + 10;
        rndInt = rndInt.toFixed(2);

        let name = "Karl";

        if (phone === "+4915750252976") {
          name = "Berkay Schatzi";
        }

        sms_body =
          "Hey " +
          name +
          " 😘 \n" +
          "Vielen Dank für deine OnlyFans Bestellung! 🔥\n" +
          "Deine Zahlung in Höhe von " +
          rndInt +
          "€" +
          " haben wir bereits von deinem Paypal Account (@karlrichterde) erhalten. \n" +
          "Dein Foto findest du hier: " +
          link +
          ". \n" +
          "Viel Spaß 😏🍆💦 \n" +
          "Wir freuen uns auf deine nächste Bestellung Süßer 😛!\n" +
          "Deine Mandy von OnlyFans 💋";
      }

      client.messages
        .create({
          body: sms_body,
          to: phone,
          from: "+15014833418", //replace : phone
        })
        .then((message) => console.log(message))
        .catch((error) => console.log(error));
    }
  }
};
/*const sendEmail = async (email) => {
	
};*/
const triggerNotification = async (dataCollectionEvent) => {
  // Load all notification triggers for the data collector of the respective event
  let notifications = await getNotificationsForCollectorId(
    dataCollectionEvent.dataCollectorId
  );

  // Check thresholds in all notification triggers
  notifications.map((notification) => {
    // Parse the data from the event using a custom JSON Path function
    try {
      if (!notification.paused) {
        let data = Parsing.getDataForPath(
          dataCollectionEvent.data,
          notification.field.path
        );
        checkThresholdSendEmail(
          data,
          notification.rule,
          notification.criticalvalue,
          notification.email,
          notification.field.path,
          notification.title,
          notification.channel,
          notification.phone
        );
      }
    } catch (e) {
      console.log("Error while handling the notification:");
      console.log(e);
    }
  });
};

module.exports = {
  triggerNotification,
};
