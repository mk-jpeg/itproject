const express = require("express");
const router = express.Router();
const progressController = require("../controllers/ProgressController");

/**
 * @swagger
 * /api/progress/save:
 *   post:
 *     summary: Save a student's progress in a game
 *     description: Allows a student to save their progress (score) after completing a game.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: The ID of the student.
 *               game:
 *                 type: string
 *                 enum: ["Antonym Game", "Grammar Game"]
 *                 description: The name of the game the student played.
 *               score:
 *                 type: integer
 *                 description: The score the student achieved in the game.
 *     responses:
 *       201:
 *         description: Progress saved successfully.
 *       400:
 *         description: Missing required fields or invalid data.
 *       500:
 *         description: Server error.
 */
router.post("/save", progressController.saveProgress);  // Route to save progress

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
router.get("/student/:studentId", progressController.getStudentProgress);  // Route to get student progress

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
router.get("/all", progressController.getAllStudentsProgress);  // Route to get all students' progress

module.exports = router;
