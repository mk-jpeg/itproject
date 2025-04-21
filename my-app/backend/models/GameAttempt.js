const mongoose = require('mongoose');
const { GAME_TYPES } = require('../utils/roles');

const gameAttemptSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameType: { type: String, enum: GAME_TYPES, required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GameAttempt', gameAttemptSchema);
