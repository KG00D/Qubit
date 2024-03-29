const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Account, accountTransaction, accountHolding } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { updateHoldingFromTransaction } = require('../../services/updateHoldings');
const router = express.Router({ mergeParams: true });

router.use(restoreUser)

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { accountId, holdingId } = req.query;
    const currentUserId = req.user.id;

    let filters = {};
    if (accountId) {
      filters.accountId = accountId;
    }
    if (holdingId) {
      filters.holdingId = holdingId;
    }

    const allowedAccountIds = await Account.findAll({
      where: { userId: currentUserId },
      attributes: ['id'],
      raw: true,
    });

    let accountTransactions = await accountTransaction.findAll({
      where: {
        ...filters,
        accountId: {
          [Op.in]: allowedAccountIds.map(a => a.id),
        },
      },
      include: [
        {
          model: accountHolding,
          attributes: ['id', 'holdingName', 'securityName'],
        },
      ],
      attributes: [
        'id', 'holdingId', 'accountId', 'securityName', 'amount',
        'date', 'fees', 'transactionType', 'transactionDescription', 'price', 'quantity'
      ],
    });

    accountTransactions = accountTransactions.map(transaction => ({
      ...transaction.toJSON(), 
      amount: parseFloat(transaction.amount),
      fees: parseFloat(transaction.fees),
      price: parseFloat(transaction.price),
      quantity: parseFloat(transaction.quantity),
    }));

    res.json(accountTransactions);
  } catch (error) {
    next(error);
  }
});

router.post('/', requireAuth, async (req, res, next) => {
    try {
        let { holdingId, accountId, transactionType, securityName, amount, date, fees,
          transactionDescription, price, quantity } = req.body;
      
        quantity = parseFloat(quantity);
        amount = parseFloat(amount);
        fees = parseFloat(fees);
        price = parseFloat(price);
        quantity = parseFloat(quantity);
      
        const currentUserId = req.user.id;
        const userAccount = await Account.findOne({ where: { userId: currentUserId } });
        const newTransaction = await accountTransaction.create({
            holdingId,
            accountId: userAccount.id,
            transactionType,
            securityName,
            amount,
            date,
            fees,
            transactionDescription,
            price,
            quantity
        });
      
        await updateHoldingFromTransaction(newTransaction);

        res.status(201).json({transaction: newTransaction});
    } catch (error) {
        next(error);
    }
});

router.put('/:transactionId', requireAuth, async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        let { securityName, amount, date, transactionDescription, price, quantity, subType, type } = req.body;
        const currentUserId = req.user.id;
      
        quantity = parseFloat(quantity);
        amount = parseFloat(amount);
        fees = parseFloat(fees);
        price = parseFloat(price);
        quantity = parseFloat(quantity);

        const transaction = await accountTransaction.findOne({ 
            where: { id: transactionId },
            include: [{ model: Account, where: { userId: currentUserId } }]
        });

        if (!transaction) {
            return res.status(403).send('Not authorized to update this transaction');
        }

        await accountTransaction.update({
            securityName,
            amount,
            date,
            transactionDescription,
            price,
            quantity,
            subType,
            type
        }, {
            where: { id: transactionId }
        });

        const updatedTransaction = await accountTransaction.findByPk(transactionId);
        
        // await updateHoldingFromTransaction(updatedTransaction);

        res.json(updatedTransaction);
    } catch (error) {
        next(error);
    }
});

router.delete('/:transactionId', requireAuth, async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        const currentUserId = req.user.id;

        const transaction = await accountTransaction.findOne({
            where: { id: transactionId },
            include: [{ model: Account, where: { userId: currentUserId } }]
        });

        if (!transaction) {
            return res.status(403).send('Not authorized to delete this transaction');
        }

        if (transaction.transactionType === 'Value Update') {
            let holding = await accountHolding.findOne({
                where: {
                    accountId: transaction.accountId,
                    securityName: transaction.securityName,
                }
            });
            console.log('delte ,Value Update ', holding);
            if (holding) {
                holding.currentValue = holding.quantity * holding.averagePricePaid;
                await holding.save();
            }
        } else {
        
        }

        await accountTransaction.destroy({ where: { id: transactionId } });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
