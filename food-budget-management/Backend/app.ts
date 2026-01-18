// app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./models/index.ts"; // models/index.ts export default sequelize

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello, backend is running!");
});

// Start server only after DB connection
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected via Sequelize");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
  }
};

startServer();
