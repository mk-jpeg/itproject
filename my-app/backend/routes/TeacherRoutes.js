const express = require('express');
const router = express.Router();
const GameAttempt = require('../models/GameAttempt');
const User = require('../models/User');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const { STUDENT, TEACHER, GAME_TYPES } = require('../utils/roles');

/**
 * @swagger
 * /api/teacher/students:
 *   get:
 *     summary: Get all students with game attempt stats
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students with game stats
 *       500:
 *         description: Server error
 */
router.get(
  '/students',
  verifyToken,
  authorizeRoles(TEACHER),
  async (req, res) => {
    try {
      const students = await User.find({ role: STUDENT });
      const data = await Promise.all(
        students.map(async (student) => {
          const attempts = await GameAttempt.find({ student: student._id });
          const grouped = GAME_TYPES.map((game) => {
            const filtered = attempts.filter((a) => a.gameType === game);
            const avg = filtered.length
              ? (
                  filtered.reduce((sum, a) => sum + a.score, 0) /
                  filtered.length
                ).toFixed(2)
              : 0;
            return { game, attempts: filtered.length, averageScore: avg };
          });
          return {
            student: {
              id: student._id,
              username: student.username,
              email: student.email,
            },
            stats: grouped,
          };
        })
      );
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
