const express = require('express');
const { AccountBalances, Account } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();
const { Sequelize } = require('sequelize');

router.get('/', requireAuth, async (req, res, next) => {
    try {
        const userId = req.user.id;

        const totalBalancesByDate = await AccountBalances.findAll({
            include: [{
                model: Account,
                where: { userId: userId },
                attributes: []
            }],
            attributes: [
                // [Sequelize.fn('date', Sequelize.col('AccountBalances.balanceDate')), 'balanceDate'],
                'balanceDate',
                [Sequelize.fn('sum', Sequelize.col('AccountBalances.accountBalance')), 'totalBalance']
            ],
            // group: [Sequelize.fn('date', Sequelize.col('AccountBalances.balanceDate'))],
            group: 'balanceDate',
            order: [[Sequelize.fn('date', Sequelize.col('AccountBalances.balanceDate')), 'ASC']]
        });
        if (totalBalancesByDate.length > 0) {
            res.json(totalBalancesByDate);
        } else {
            res.status(404).json({ message: "Total balances not found" });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
