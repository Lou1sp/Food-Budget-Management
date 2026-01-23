import { DataTypes, Model } from "sequelize";
import  { sequelize } from "./db.ts";
export default class User extends Model{
    declare id: number;
    declare username: string;
    declare email: string;
    declare hashedPassword: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }, 

        hashedPassword: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "userAccount",
        timestamps: true,
    }
)