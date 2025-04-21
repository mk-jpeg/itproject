const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const { TEACHER } = require('../utils/roles');
/**
 * @swagger
 * /api/users/students:
 *   get:
 *     summary: Get a list of all students (accessible by teachers)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of students
 *       403:
 *         description: Access denied
 *       500:
 *         description: Server error
 */
router.get(
  '/students',
  verifyToken,
  authorizeRoles(TEACHER),
  userController.getAllStudents
);

module.exports = router;
