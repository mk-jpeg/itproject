const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  game: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Progress", progressSchema);
