const jwt = require('jsonwebtoken'); // You'll need to install jsonwebtoken: npm install jsonwebtoken

const authInterceptor = (type) => async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' }); // 401 Unauthorized
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    if(type !== decoded.type) return res.status(401).json({ message: 'No token, authorization denied' });
    req.auth = decoded; // Add user info to the request object
    next(); // Continue to the next middleware/route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' }); // 401 Unauthorized
  }
};

module.exports = authInterceptor;