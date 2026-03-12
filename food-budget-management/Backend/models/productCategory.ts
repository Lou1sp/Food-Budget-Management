import { DataTypes, Model } from "sequelize";
import { sequelize } from "./db";

export default class ProductCategory extends Model {
  declare id: number;
  declare name: string;
  declare slug: string;
  declare created_at: Date;
}

ProductCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,    
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,       
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "productCategories",
    timestamps: false,
  }
);