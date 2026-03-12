import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";

export default class ProductPrice extends Model {
  declare id: number;
  declare product_id: string;
  declare price: number;
  declare price_per_unit: string;
  declare currency: string;
  declare timestamp: Date;
}

ProductPrice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    price_per_unit: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING(3),
      defaultValue: "CAD",
    },
    timestamp: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProductPrice",
    tableName: "product_price", 
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["product_id", "timestamp"],
      },
      {
        fields: ["product_id"], 
      },
    ],
  }
);