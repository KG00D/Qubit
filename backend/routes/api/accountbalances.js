const express = require('express');
const { AccountBalances } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();
const { Sequelize } = require('sequelize');


router.use(restoreUser);

router.get('/:accountId', requireAuth, async (req, res, next) => {
    try {
        const accountId = req.params.accountId;
        const accountBalances = await AccountBalances.findAll({
            where: { accountId: accountId }
        });

        if (accountBalances && accountBalances.length > 0) { 
            res.json({ data: accountBalances }); 
        } else {
            res.status(404).json({ message: "Account balances not found" }); 
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', requireAuth, async (req, res, next) => {
    try {
        const { accountId, accountBalance, balanceDate } = req.body;
        const newAccountBalance = await AccountBalances.create({
            accountId,
            accountBalance,
            balanceDate
        });

        return res.status(201).json({ accountBalanceId: newAccountBalance.id, message: "Account balance created successfully" });
    } catch (error) {
        next(error);
    }
});

router.put('/:id', requireAuth, async (req, res, next) => {
    try {
        const id = req.params.id;
        const { accountBalance } = req.body;
        const accountBalanceEntry = await AccountBalances.findByPk(id);

        if (!accountBalanceEntry) {
            return res.status(404).json({ message: "Account balance not found" });
        }

        await accountBalanceEntry.update({ accountBalance });
        return res.json({ accountBalanceId: accountBalanceEntry.id, message: "Account balance updated successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;

