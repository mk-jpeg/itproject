const express = require("express");
const router = express.Router();
const { getGrammarWords, addGrammarWord, deleteGrammarWord } = require("../controllers/GrammarController");
const { verifyTeacher } = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Grammar
 *   description: API for managing Grammar Sort game words
 */

/**
 * @swagger
 * /api/grammar:
 *   get:
 *     summary: Get all grammar words
 *     tags: [Grammar]
 *     responses:
 *       200:
 *         description: Successful response with a list of words
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   word:
 *                     type: string
 *                   category:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get("/", getGrammarWords);

module.exports = router;
