"use strict";

// Configuration variables
const port = process.env.PORT || "4000";
const mongoURI =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/inspectra-db"
    : "mongodb+srv://dbUser:lOqi7DLUOLnUxSOk@cluster0.lytmn.mongodb.net/db?retryWrites=true&w=majority";
const JwtSecret = process.env.JWT_SECRET || "very secret secret";

module.exports = {
  port,
  mongoURI,
  JwtSecret,
};
