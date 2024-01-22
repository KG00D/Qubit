const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Account, accountTransaction, accountHolding } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router({ mergeParams: true });

router.use(restoreUser)

router.get('/', async (req, res, next) => {
    console.log("Route accessed");
    console.log("Account ID:", req.params.accountId);
    console.log("Holding ID:", req.params.holdingId);
    
    try {
        const { accountId, holdingId } = req.params;

        const account = await Account.findByPk(accountId, {
            attributes: ['id', 'name', 'type']
        });

        if (!account) {
            return res.status(404).json({ message: "Account Not Found" });
        }

        const holding = await accountHolding.findOne({
            where: { id: holdingId, accountId: accountId }
        });

        if (!holding) {
            return res.status(404).json({ message: "Holding Not Found" });
        }

        const accountTransactions = await accountTransaction.findAll({
            where: { accountId: accountId, holdingId: holdingId },
            attributes: [
                'holdingId',
                'accountId',
                'securityName',
                'holdingName',
                'amount',
                'date',
                'fees',
                'transactionDescription',
                'price',
                'quantity'
            ]
        });

        res.json({
            account: account,
            holding: holding,
            transactions: accountTransactions
        });
    } catch (error) {
        next(error);
    }
});





module.exports = router;
