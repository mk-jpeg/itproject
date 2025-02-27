const GrammarWord = require("../models/GrammarWord");

// Get all words categorized for the game
exports.getGrammarWords = async (req, res) => {
  try {
    const words = await GrammarWord.find({});
    res.status(200).json(words);
  } catch (error) {
    res.status(500).json({ message: "Error fetching words", error });
  }
};
