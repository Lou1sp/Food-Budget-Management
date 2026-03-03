import { sequelize } from "./db";

import User from "./userAcc";
import Budget from "./monthlyBudget";
import Category from "./marketCategory";
import Transaction from "./dailyTransaction";

/* ========== ASSOCIATIONS ========== */
//All the belongsTo... means JOIN ... ON ..., so later when query we dont actually need to write like in Postgres
// User
User.hasMany(Budget, { foreignKey: "user_id" });
User.hasMany(Category, { foreignKey: "user_id" });
User.hasMany(Transaction, { foreignKey: "user_id" });

// Budget
Budget.belongsTo(User, { foreignKey: "user_id" });
Budget.hasMany(Transaction, { foreignKey: "budget_id" });

// Category
Category.belongsTo(User, { foreignKey: "user_id" });
Category.hasMany(Transaction, { foreignKey: "category_id", as: "transactions" });

// Transaction
Transaction.belongsTo(User, { foreignKey: "user_id" });
Transaction.belongsTo(Category, { foreignKey: "category_id", as: "category" });
Transaction.belongsTo(Budget, { foreignKey: "budget_id" });

/* ========== EXPORTS ========== */
export {
  sequelize,
  User,
  Budget,
  Category,
  Transaction,
};
