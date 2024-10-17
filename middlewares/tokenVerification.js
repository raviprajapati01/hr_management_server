const jwt = require('jsonwebtoken');

module.exports= (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header

  console.log("Token is: ", token);

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};