const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = authenticateToken;
// This middleware function checks if the user is authenticated by verifying the JWT token.
// If the token is valid, it adds the user information to the request object and calls the next middleware.
// If the token is invalid or missing, it sends an error response.