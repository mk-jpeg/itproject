const mongoose = require("mongoose");

const GrammarWordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  category: { type: String, required: true, enum: ["Noun", "Verb", "Both"] },
});

module.exports = mongoose.model("GrammarWord", GrammarWordSchema);
