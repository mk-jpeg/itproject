const express = require("express");
const router = express.Router();
const Progress = require("../models/progressModel");

/**
 * @swagger
 * /api/progress/student/{studentId}:
 *   get:
 *     summary: Get a specific student's progress
 *     description: Retrieve the progress of a logged-in student by their ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student whose progress is being fetched.
 *     responses:
 *       200:
 *         description: Successfully retrieved student's progress.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   studentId:
 *                     type: string
 *                     description: The student's ID.
 *                   game:
 *                     type: string
 *                     description: The name of the game.
 *                   score:
 *                     type: integer
 *                     description: The student's score in the game.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date the progress was recorded.
 *       404:
 *         description: No progress found for the student.
 *       500:
 *         description: Server error.
 */
router.get("/student/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const progress = await Progress.find({ studentId });
    
    if (!progress.length) {
      return res.status(404).json({ error: "No progress found for this student" });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Error fetching student progress" });
  }
});

/**
 * @swagger
 * /api/progress/all:
 *   get:
 *     summary: Get all students' progress
 *     description: Retrieve the progress data for all students (for the Teacher Dashboard).
 *     responses:
 *       200:
 *         description: Successfully retrieved all students' progress.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   studentId:
 *                     type: string
 *                     description: The student's ID.
 *                   game:
 *                     type: string
 *                     description: The name of the game.
 *                   score:
 *                     type: integer
 *                     description: The student's score in the game.
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: The date the progress was recorded.
 *       500:
 *         description: Server error.
 */
router.get("/all", async (req, res) => {
  try {
    const progress = await Progress.find();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Error fetching progress data" });
  }
});

module.exports = router;
