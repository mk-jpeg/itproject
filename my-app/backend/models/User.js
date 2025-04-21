const { STUDENT, TEACHER } = require('../utils/roles');

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [TEACHER, STUDENT],
    required: true,
    default: STUDENT,
  },
  progress: {
    antonymGame: { type: Number, default: 0 }, // Track Antonym Game progress
    grammarGame: { type: Number, default: 0 }, // Track Grammar Game progress
  },
});

module.exports = mongoose.model('User', UserSchema);
