const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: String,
  endDate: String,
  budget: String,
  travelersNeeded: Number,
  description: String,
  interests: [String],
});

module.exports = mongoose.model("Trip", tripSchema);