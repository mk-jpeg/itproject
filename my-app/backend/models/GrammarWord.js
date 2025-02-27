const mongoose = require("mongoose");

const GrammarWordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  category: { type: String, enum: ["noun", "verb", "both"], required: true },
});

module.exports = mongoose.model("GrammarWord", GrammarWordSchema);
