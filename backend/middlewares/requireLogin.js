const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization;
  
  if (!token) {
    return res.status(401).json("Not Authenticated");
  }

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) {
      return res.status(403).json("Token is not valid");
    }
    req.userInfo = userInfo; // Attach user info to the request object
    next(); // Move to the next middleware or route handler
  });
};

module.exports = verifyToken;
