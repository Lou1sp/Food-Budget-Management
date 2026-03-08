//Initializing Sequelize
import { Sequelize } from "sequelize"; 
import config from "../config/Database"; 
import dotenv from "dotenv"; 
import pg from "pg";
dotenv.config(); 
pg.types.setTypeParser(1082, (val: string) => val);
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
    timezone: "+00:00",
   } 
  
);