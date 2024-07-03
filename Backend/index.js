const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

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
      origin: "http://localhost:5173",
    })
  );

  // Routes
  const authRoutes = require("./routes/auth.route");
  const userRoutes = require("./routes/user.route");

  app.use("/api/user", verifyToken, userRoutes);
  app.use("/api/auth", authRoutes);

  // const authRoutes = require("./routes/auth.route");
  // const productRoutes = require("./routes/product.route");
  // const protectedRoutes = require("./routes/protected.route");
  // const userRoutes = require("./routes/user.route");

  // app.use("/api/product", productRoutes);
  // app.use("/api/auth", authRoutes);
  // app.use("/api/protected", verifyToken, protectedRoutes);
  // app.use("/api/user", verifyToken, userRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
