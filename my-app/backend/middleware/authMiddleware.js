const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token)
    return res
      .status(403)
      .json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Logged-in user:', req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log('authorizeRoles', req);
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: 'Access denied. Unauthorized role.' });
    }
    next();
  };
};
