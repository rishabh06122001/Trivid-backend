const mongoose = require("mongoose");

const panditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  contact: { type: String, required: true },
});

module.exports = mongoose.model("pandit", panditSchema);
