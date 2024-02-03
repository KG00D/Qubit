'use strict';
const db = require('../db/models'); 

async function updateHoldingFromTransaction(transaction) {
    try {
        let holding = await db.accountHolding.findOne({
            where: {
                accountId: transaction.accountId,
                securityName: transaction.securityName,
            }
        });
        // console.log('1 holding ', holding, transaction);

        if (!holding) {
            holding = await db.accountHolding.create({
                accountId: transaction.accountId,
                securityName: transaction.securityName,
                quantity: 0,
                currentValue: 0,
                averagePricePaid: 0,
            });
        }

        switch (transaction.transactionType) {
            case 'Open':
            case 'Buy':
            case 'Reinvested Dividend':
                const totalCostBeforeTransaction = holding.averagePricePaid * holding.quantity;
                const additionalCost = transaction.transactionType === 'Reinvested Dividend' ? transaction.amount : transaction.price * transaction.quantity;
                const additionalQuantity = transaction.transactionType === 'Reinvested Dividend' ? transaction.amount / transaction.price : transaction.quantity;
                const newQuantity = parseFloat(holding.quantity) + parseFloat(additionalQuantity);
                holding.averagePricePaid = (parseFloat(totalCostBeforeTransaction) + parseFloat(additionalCost)) / newQuantity;
                holding.quantity = newQuantity;

                holding.currentValue = newQuantity * holding.averagePricePaid;
                break;
            case 'Sell':
                holding.quantity -= transaction.quantity;
                holding.currentValue = holding.quantity * holding.averagePricePaid; 
                break;
            case 'Value Update':
                const latestValueUpdate = await db.accountTransaction.findOne({
                    where: {
                        accountId: transaction.accountId,
                        securityName: transaction.securityName,
                        transactionType: 'Value Update',
                    },
                    order: [['createdAt', 'DESC']],
                });

                if (transaction.id === latestValueUpdate.id) {
                    holding.currentValue = transaction.amount;
                }
                
                break;
            case 'Cash Dividend':
                break;
            default:
                throw new Error(`Invalid transaction type: ${transaction.transactionType}`);
        }
        await holding.save();
        return holding;
    } catch (error) {
        console.error('Error updating holding from transaction:', error);
        throw error;
    }
}

module.exports = { updateHoldingFromTransaction };
