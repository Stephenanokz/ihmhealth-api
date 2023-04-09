const mongoose = require("mongoose");

const LandingSchema = new mongoose.Schema(
  {
    title: { type: String },
    subtitle: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Landing", LandingSchema);