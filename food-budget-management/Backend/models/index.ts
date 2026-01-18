// models/index.ts
import { Sequelize } from "sequelize";
import config from "../config/Database.ts"; 
import dotenv from "dotenv";
dotenv.config();

console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("TYPE:", typeof process.env.DB_PASSWORD);

const env = (process.env.NODE_ENV || "development") as "development" | "test" | "production";


const sequelize = new Sequelize(
  config[env].database!,
  config[env].username!,
  config[env].password!,
  {
    host: config[env].host,
    port: config[env].port,
    dialect: "postgres",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected via Sequelize");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
})();

export default sequelize;
