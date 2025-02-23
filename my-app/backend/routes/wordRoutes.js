const express = require("express");
const router = express.Router();
const wordController = require("../controllers/wordController");

/**
 * @swagger
 * /api/words:
 *   get:
 *     summary: Get a list of all words
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of words
 *       500:
 *         description: Server error
 */
router.get("/words", wordController.getWords);

module.exports = router;
