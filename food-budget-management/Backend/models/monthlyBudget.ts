import { DataTypes, ForeignKey, Model } from "sequelize";
import { sequelize } from "./db";
export default class Budget extends Model {
  declare id: number;
  declare user_id: number;
  declare year: number;
  declare month: number;
  declare amount: number;
  declare created_at: Date;
}

Budget.init(
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

    year: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },

    month: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        min: 1,
        max: 12,
      },
    },

    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Budget",
    tableName: "MonthlyBudget",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "year", "month"], //Dont allow any more than 1 line that has ALL 3 same data
      },
    ],
  },
);
