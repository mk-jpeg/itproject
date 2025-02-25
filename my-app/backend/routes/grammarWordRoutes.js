const express = require("express");
const router = express.Router();
const grammarWordController = require("../controllers/grammarWordController");

/**
 * @swagger
 * /api/grammarWords:
 *   get:
 *     summary: Get a list of all grammar words
 *     tags: [GrammarWords]
 *     responses:
 *       200:
 *         description: A list of grammar words
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/grammarWords/{category}:
 *   get:
 *     summary: Get words by category (Noun, Verb, Both)
 *     tags: [GrammarWords]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Noun, Verb, Both]
 *         description: The category of words to retrieve
 *     responses:
 *       200:
 *         description: A list of words from the specified category
 *       400:
 *         description: Invalid category
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/grammarWords:
 *   post:
 *     summary: Add a new word with its grammatical category
 *     tags: [GrammarWords]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - word
 *               - category
 *             properties:
 *               word:
 *                 type: string
 *                 example: Run
 *               category:
 *                 type: string
 *                 enum: [Noun, Verb, Both]
 *                 example: Both
 *     responses:
 *       201:
 *         description: Word added successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/grammarWords/{id}:
 *   delete:
 *     summary: Delete a word by ID
 *     tags: [GrammarWords]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the word to delete
 *     responses:
 *       200:
 *         description: Word deleted successfully
 *       404:
 *         description: Word not found
 *       500:
 *         description: Server error
 */


router.get("/grammarWords", grammarWordController.getGrammarWords);
router.get("/grammarWords/:category", grammarWordController.getGrammarWordsByCategory);
router.post("/grammarWords", grammarWordController.addGrammarWord);
router.delete("/grammarWords/:id", grammarWordController.deleteGrammarWord);

module.exports = router;
