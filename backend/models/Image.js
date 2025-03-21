const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  order: { type: Number, required: true, unique: true },
});

module.exports = mongoose.model("Image", ImageSchema);
