const mongoose = require("mongoose");

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  antonym: { type: String, required: true },
  distractors: { type: Array, required: true },
});

module.exports = mongoose.model("Word", WordSchema);
