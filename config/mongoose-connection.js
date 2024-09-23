const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(function () {
    dbgr("Connected to MongoDB");
  })
  .catch(function (err) {
    dbgr("Failed to connect to MongoDB", err);
  });

const db = mongoose.connection;
module.exports = db;
