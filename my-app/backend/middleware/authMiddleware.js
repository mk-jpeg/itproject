const jwt = require("jsonwebtoken");


exports.verifyTeacher = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token)
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    if (decoded.role !== "teacher") {
      return res
        .status(403)
        .json({
          message: "Access denied. Only teachers can access this resource.",
        });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

// Middleware to verify student role
exports.verifyStudent = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    if (decoded.role !== "student") {
      return res.status(403).json({
        message: "Access denied. Only students can access this resource.",
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

// Middleware to verify any logged-in user (teacher or student)
exports.verifyUser = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};