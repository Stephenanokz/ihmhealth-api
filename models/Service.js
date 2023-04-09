const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, default: "" },
    desc: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);
