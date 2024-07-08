const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const CLIENT_URL = process.env.CLIENT_URL;
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");
const { verifyToken } = require("./middlewares/auth.middleware");

dotenv.config(); // Load config

async function main() {
  // Connect to database
  await connectDB();
  // const { verifyToken } = require("./middlewares/auth.middleware");

  // MIDDLEWARES
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
    })
  );

  // Routes
  const authRoutes = require("./routes/auth.route");
  const userRoutes = require("./routes/user.route");

  app.use(express.static("public"));
  app.use("/api/user", verifyToken, userRoutes);
  app.use("/api/auth", authRoutes);

  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
