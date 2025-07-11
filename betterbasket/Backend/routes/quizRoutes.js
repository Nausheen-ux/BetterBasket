const express = require('express');
const router = express.Router();
const QuizResponse = require('../models/quizResponse');

// POST /api/quiz - save quiz responses
router.post('/', async (req, res) => {
try {
console.log("Received quiz data:", req.body); // Debug log
const { responses } = req.body;

if (!responses) {
  return res.status(400).json({ error: "Missing responses in request body" });
}

const newResponse = new QuizResponse({ responses });
await newResponse.save();

res.status(201).json({ message: 'Quiz saved successfully' });
} catch (err) {
console.error('Error saving quiz:', err);
res.status(500).json({ error: 'Failed to save quiz' });
}
});

module.exports = router;

