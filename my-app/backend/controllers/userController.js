const User = require("../models/User");

exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
