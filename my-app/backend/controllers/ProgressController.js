const Progress = require("../models/Progress");

// Save progress
exports.saveProgress = async (req, res) => {
    try {
        const { userId, game, score } = req.body;
        const progress = new Progress({ userId, game, score, date: new Date() });
        await progress.save();
        res.status(201).json({ message: "Progress saved successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get specific student's progress
exports.getStudentProgress = async (req, res) => {
    try {
        const { userId } = req.params;
        const progress = await Progress.find({ userId });
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all students' progress for teacher dashboard
exports.getAllStudentsProgress = async (req, res) => {
    try {
        const progress = await Progress.find();
        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
