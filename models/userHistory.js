const mongoose = require("mongoose");

const userHistory = mongoose.model(
  "user_history",
  new mongoose.Schema({
    user_id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    win: {
      type: Number,
      required: true,
    },
    draw: {
      type: Number,
      required: true,
    },
    lose: {
      type: Number,
      required: true,
    },
    scheme: {
      type: String,
      required: true,
    },
    oponent: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
  })
);

module.exports = userHistory;
