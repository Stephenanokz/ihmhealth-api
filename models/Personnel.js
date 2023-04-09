const mongoose = require("mongoose");

const PersonnelSchema = new mongoose.Schema(
  {
    title: { type: String },
    fullName: { type: String, required: true },
    img: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Personnel", PersonnelSchema);
