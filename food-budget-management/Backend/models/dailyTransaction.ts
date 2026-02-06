import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";
export default class Transaction extends Model {
  declare id: number;
  declare user_id: number;
  declare category_id: number;
  declare amount: number;
  declare spend_at: Date;
  declare note?: string;
  declare created_at: Date;
}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },

  spent_at: {
    type: DataTypes.DATEONLY, // YYYY-MM-DD
    allowNull: false,
  },

  note: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
},
{
    sequelize,
    tableName: "transactions",
    timestamps: false,

    indexes: [
      {
        fields: ["user_id"],
      },
      {
        fields: ["spent_at"],
      },
      {
        fields: ["category_id"],
      },
    ],
  });
