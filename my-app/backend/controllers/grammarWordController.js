const GrammarWord = require("../models/GrammarWord");

// Get all words
exports.getGrammarWords = async (req, res) => {
  try {
    const words = await GrammarWord.find({});
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get words by category (Noun, Verb, Both)
exports.getGrammarWordsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!["Noun", "Verb", "Both"].includes(category)) {
      return res.status(400).json({ error: "Invalid category. Choose Noun, Verb, or Both." });
    }
    const words = await GrammarWord.find({ category });
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new word
exports.addGrammarWord = async (req, res) => {
  try {
    const { word, category } = req.body;
    if (!word || !category) {
      return res.status(400).json({ error: "Word and category are required" });
    }
    if (!["Noun", "Verb", "Both"].includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const newWord = new GrammarWord({ word, category });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a word
exports.deleteGrammarWord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWord = await GrammarWord.findByIdAndDelete(id);
    if (!deletedWord) {
      return res.status(404).json({ error: "Word not found" });
    }
    res.json({ message: "Word deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
