'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
      });
      Account.hasMany(models.Transaction, {
        as: 'transactions',
        foreignKey: 'accountId',
      });
    }
  }
  Account.init(
    {
      userId: DataTypes.INTEGER,
      balance: DataTypes.FLOAT,
      accountNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Account',
    },
  );
  return Account;
};
