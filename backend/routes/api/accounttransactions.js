const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Account, accountTransaction, accountHolding } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
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

        const accountTransactions = await accountTransaction.findAll({
            where: filters,
            include: [{
                model: Account,
                where: { userId: currentUserId },
                attributes: [], 
            }],
            attributes: [
                'id', 'holdingId', 'accountId', 'securityName', 'holdingName', 'amount',
                'date', 'fees', 'transactionDescription', 'price', 'quantity'
            ],
        });

        res.json(accountTransactions);
    } catch (error) {
        next(error);
    }
});

router.post('/', requireAuth, async (req, res, next) => {
    try {
        const { securityName, amount, date, transactionDescription, price, quantity, subType, type } = req.body;
        const currentUserId = req.user.id;

        const userAccount = await Account.findOne({ where: { userId: currentUserId } });
        const newTransaction = await accountTransaction.create({
            securityName,
            amount,
            date,
            transactionDescription,
            price,
            quantity,
            subType,
            type,
            accountId: userAccount.id, 
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        next(error);
    }
});

router.put('/:transactionId', requireAuth, async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        const { securityName, amount, date, transactionDescription, price, quantity, subType, type } = req.body;
        const currentUserId = req.user.id;

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

        await accountTransaction.destroy({ where: { id: transactionId } });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;
