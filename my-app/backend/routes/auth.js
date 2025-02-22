const express = require("express");
const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.json({ message: "Auth route is working!" });
});

module.exports = router;
