const Progress = require("../models/Progress");

// Get all progress records for a specific user
exports.getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.find({ userId });

    if (!progress || progress.length === 0) {
      return res.status(404).json({ message: "No progress found for this user." });
    }

    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get progress for a specific game
exports.getGameProgress = async (req, res) => {
  try {
    const { userId, gameType } = req.params;
    const progress = await Progress.findOne({ userId, gameType });

    if (!progress) {
      return res.status(404).json({ message: "No progress found for this game." });
    }

    res.json({
      userId: progress.userId,
      gameType: progress.gameType,
      attempts: progress.attempts,
      totalScore: progress.totalScore,
      averageScore: progress.attempts > 0 ? progress.totalScore / progress.attempts : 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update or create progress record
exports.updateProgress = async (req, res) => {
  try {
    const { userId, gameType } = req.body;
    const { score } = req.body;

    let progress = await Progress.findOne({ userId, gameType });

    if (progress) {
      // Update existing record
      progress.attempts += 1;
      progress.totalScore += score;
    } else {
      // Create new progress record
      progress = new Progress({
        userId,
        gameType,
        attempts: 1,
        totalScore: score
      });
    }

    await progress.save();
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
