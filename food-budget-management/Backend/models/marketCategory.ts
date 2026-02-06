import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";
export default class Category extends Model {
  declare id: number;
  declare user_id: number;
  declare name: string;
  declare created_at: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "marketCategory",
    timestamps: false,

    indexes: [
      {
        unique: true,
        fields: ["user_id", "name"],
      },
    ],
  },
);
