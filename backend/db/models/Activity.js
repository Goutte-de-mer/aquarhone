const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: String,
  description: String,
  type: {
    type: String,
    enum: [
      "kayak",
      "paddle",
      "canoë",
      "bateau sans permis",
      "croisière détente",
    ],
    required: true,
  },
  location: String,
  duration: Number, //in minutes
  price: Number,
  remainingSeats: Number,
});

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
