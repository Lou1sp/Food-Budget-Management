// app.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models/index"; // models/index.ts export default sequelize
import authRoute from "./routes/authRoute"
import userData from "./routes/userData";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello, backend is running!");
});

//Forward auth call like /api/auth/... to authRoute
app.use("/api/auth", authRoute)

//Forward userData call lile /api/data/... to authRoute
app.use("/api/data", userData) 

// Start server only after DB connection
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected via Sequelize");
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
};


startServer();
