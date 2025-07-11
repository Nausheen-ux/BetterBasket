const mongoose = require('mongoose');

const quizResponseSchema = new mongoose.Schema({
  responses: {
    type: Map,
    of: Boolean,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('QuizResponse', quizResponseSchema);
