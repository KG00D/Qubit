'use strict';
const { Model, DECIMAL, BOOLEAN } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Holding extends Model {
    static associate(models) {
      Holding.belongsTo(models.Account, { 
        foreignKey: 'accountId' });
      Holding.hasMany(models.Transaction, { 
        foreignKey: 'holdingId'
      });
    }
//   static async updateHoldingFromTransactions(transaction) {
//     const holding = await this.findOne({
//       where: {
//         accountId: transaction.accountId,
//         holdingName: transaction.holdingName
//       }
//     });
//     if (holding && holding.updatedByTransactions) {
//       const totalQuantity = await sequelize.models.Transaction.sum('quantity', {
//         where: {
//           accountId: transaction.accountId,
//           holdingName: transaction.holdingName
//         }
//       });
//       await holding.update({ quantity: totalQuantity });
//     }
//   }
}

Holding.init({
    accountId: DataTypes.INTEGER,
    holdingName: DataTypes.STRING,
    currencyCode: DataTypes.STRING,
    quantity: DataTypes.DECIMAL,
    averagePricePaid: DataTypes.DECIMAL,
    positionOpenDate: DataTypes.DATE,
    // updatedByTransactions: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Holding',
  });
  return Holding;
};
