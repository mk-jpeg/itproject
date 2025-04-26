const express = require("express");
const router = express.Router();
const GameAttempt = require("../models/GameAttempt");
const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/authMiddleware");
const { STUDENT, GAME_TYPES } = require("../utils/roles");

/**
 * @swagger
 * /api/student/play:
 *   post:
 *     summary: Submit a game attempt
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gameType
 *               - score
 *             properties:
 *               gameType:
 *                 type: string
 *                 enum: [antonym, grammar]
 *               score:
 *                 type: number
 *     responses:
 *       200:
 *         description: Game attempt submitted successfully
 *       400:
 *         description: Bad request
 */
router.post("/play", verifyToken, authorizeRoles(STUDENT), async (req, res) => {
  const { gameType, score } = req.body;
  try {
    const attempt = await GameAttempt.create({
      student: req.user.id,
      gameType,
      score,
    });
    res.json(attempt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/student/attempts:
 *   get:
 *     summary: Get all game attempts for logged-in student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of game attempts
 *       500:
 *         description: Server error
 */
router.get(
  "/attempts",
  verifyToken,
  authorizeRoles(STUDENT),
  async (req, res) => {
    try {
      const attempts = await GameAttempt.find({ student: req.user.id });
      res.json(attempts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/**
 * @swagger
 * /api/student/stats:
 *   get:
 *     summary: Get logged-in student's game attempt stats
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student game stats
 *       500:
 *         description: Server error
 */
router.get("/stats", verifyToken, authorizeRoles(STUDENT), async (req, res) => {
  try {
    const attempts = await GameAttempt.find({ student: req.user.id });

    const grouped = GAME_TYPES.map((game) => {
      const filtered = attempts.filter((a) => a.gameType === game);
      const avg = filtered.length
        ? (
            filtered.reduce((sum, a) => sum + a.score, 0) / filtered.length
          ).toFixed(2)
        : 0;
      return { game, attempts: filtered.length, averageScore: avg };
    });

    res.json({
      student: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
      },
      stats: grouped,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
