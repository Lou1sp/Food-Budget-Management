import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";

export default class Products extends Model {
  declare id: string;
  declare category_id: number;
  declare title: string;
  declare image: string;
  declare brand: string;
  declare source: string;
  declare url: string;
  declare created_at: Date;
}

Products.init(
  {
    id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      autoIncrement: false,
    },
    category_id: {               
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "productCategories",
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "products",
    timestamps: false,
  }
);