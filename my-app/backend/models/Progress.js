const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gameType: { type: String, enum: ["grammarSort", "antonymGame"], required: true },
  attempts: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 }
});

// Calculate average score dynamically
ProgressSchema.virtual("averageScore").get(function () {
  return this.attempts > 0 ? this.totalScore / this.attempts : 0;
});

module.exports = mongoose.model("Progress", ProgressSchema);
