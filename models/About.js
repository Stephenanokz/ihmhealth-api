const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    body: { type: String, required: true },
    img: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", AboutSchema);
