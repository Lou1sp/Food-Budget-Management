//Initializing Sequelize
import { Sequelize } from "sequelize"; 
import config from "../config/Database.ts"; 
import dotenv from "dotenv"; 
dotenv.config(); 

const env = (process.env.NODE_ENV || "development") as "development" | "test" | "production"; 
export const sequelize = new Sequelize( 
  config[env].database!, 
  config[env].username!, 
  config[env].password!, 
   { 
    host: config[env].host, 
    port: config[env].port, 
    dialect: "postgres", 
    logging: false,
   } 
  
);