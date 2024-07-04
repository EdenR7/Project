const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied, no token" });
  try {
    const tokenWithoutBearer = token.startsWith("Bearer ")
      ? token.slice(7, token.length)
      : token;

    const decoded = jwt.verify(tokenWithoutBearer, JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("auth.middleware verifyToken:", error);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { verifyToken };
