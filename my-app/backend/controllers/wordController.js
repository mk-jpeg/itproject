const Word = require("../models/Word");

exports.getWords = async (req, res) => {
  try {
    const words = await Word.find({});
    res.json(words);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
