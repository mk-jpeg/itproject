const User = require("../models/User");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
