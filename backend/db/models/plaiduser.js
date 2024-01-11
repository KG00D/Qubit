'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlaidUser extends Model {
    static associate(models) {
      // define association here
      PlaidUser.belongsTo(models.User, { foreignKey: 'userId' });
    }
  };

  PlaidUser.init({
    userId: DataTypes.INTEGER,
    accessToken: DataTypes.STRING,
    itemId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PlaidUser',
  });
  return PlaidUser;
};

