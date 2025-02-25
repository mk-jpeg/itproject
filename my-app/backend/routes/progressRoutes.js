const express = require("express");
const router = express.Router();
const progressController = require("../controllers/ProgressController");
const { verifyUser } = require("../middleware/authMiddleware"); // Assuming you have authentication

/**
 * @swagger
 * /api/progress/{userId}:
 *   get:
 *     summary: Get all progress records for a user
 *     tags: [Progress]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User progress retrieved successfully
 *       404:
 *         description: No progress found
 *       500:
 *         description: Server error
 */
router.get("/:userId", verifyUser, progressController.getUserProgress);

/**
 * @swagger
 * /api/progress/{userId}/{gameType}:
 *   get:
 *     summary: Get progress for a specific game
 *     tags: [Progress]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: gameType
 *         required: true
 *         description: Type of game (grammarSort or antonymGame)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Game progress retrieved successfully
 *       404:
 *         description: No progress found for this game
 *       500:
 *         description: Server error
 */
router.get("/:userId/:gameType", verifyUser, progressController.getGameProgress);

/**
 * @swagger
 * /api/progress/update:
 *   post:
 *     summary: Update or create progress record for a user
 *     tags: [Progress]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - gameType
 *               - score
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *               gameType:
 *                 type: string
 *                 enum: [grammarSort, antonymGame]
 *                 description: The type of game
 *               score:
 *                 type: number
 *                 description: The score to be added
 *     responses:
 *       200:
 *         description: Progress updated successfully
 *       500:
 *         description: Server error
 */
router.post("/update", verifyUser, progressController.updateProgress);

module.exports = router;
