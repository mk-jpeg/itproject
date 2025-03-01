const Progress = require("../models/progressModel"); // Ensure the correct file path

// Save a student's game progress
exports.saveProgress = async (req, res) => {
    try {
        const { studentId, game, score } = req.body;

        // Validate request
        if (!studentId || !game || score === undefined) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Save progress
        const newProgress = new Progress({ studentId, game, score });
        await newProgress.save();

        res.status(201).json({ message: "Progress saved successfully!", progress: newProgress });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get progress for a specific student
exports.getStudentProgress = async (req, res) => {
    try {
        const { studentId } = req.params;

        // Validate student ID
        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required." });
        }

        const progress = await Progress.find({ studentId });

        if (!progress || progress.length === 0) {
            return res.status(404).json({ message: "No progress found for this student." });
        }

        res.status(200).json(progress);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get all students' progress (for teacher dashboard)
exports.getAllStudentsProgress = async (req, res) => {
    try {
        const progressData = await Progress.find();

        if (!progressData || progressData.length === 0) {
            return res.status(404).json({ message: "No progress data found." });
        }

        res.status(200).json(progressData);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

