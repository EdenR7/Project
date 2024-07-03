const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  console.log("middleware");
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied, no token" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("auth.middleware verifyToken:", error);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { verifyToken };
