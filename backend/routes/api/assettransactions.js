const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Account, assetTransaction } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.use(restoreUser)

router.get('/', async (req, res, next) => {
    try {
        const accountId = req.params.accountId;
        const accounts = await Account.findOne({
            attributes: ['id', 'name', 'type'],
            where: {id: accountId}
        });

        if (!accounts) {
            return res.status(404).json({ message: "Account Not Found" });
        }
        const assetTransactions = await assetTransaction.findAll({
            where: { accountId: accountId },
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
        const normalizedAssetTransactions = assetTransactions.reduce((acc, transactions) => {
            acc[transactions.transactionIdentifier] = transactions;
            return acc;
        }, {});

        const responseData = {
            account: accounts,
            assetTransactions: normalizedAssetTransactions
        };

        res.json(responseData);
    } catch (error) {
        next(error);
    }
});

router.get('/accountId', async (req, res, next) => {
    try {
        const accountId = req.params.accountId;
        const accounts = await Account.findOne({
            attributes: ['id', 'name', 'type'],
            where: {id: accountId}
        });

        if (!accounts) {
            return res.status(404).json({ message: "Account Not Found" });
        }

        const assetTransactions = await assetTransaction.findAll({
            where: { accountId: accountId },
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
        const normalizedAssetTransactions = assetTransactions.reduce((acc, transactions) => {
            acc[transactions.transactionIdentifier] = transactions;
            return acc;
        }, {});

        const responseData = {
            account: accounts,
            assetTransactions: normalizedAssetTransactions
        };

        res.json(responseData);
    } catch (error) {
        next(error);
    }
});

// router.get('/', async (req, res, next) => {
//     try {
//         const accountId = req.params.accountId;
//         const accounts = await Account.findOne({
//             attributes: ['id', 'name', 'type'],
//             where: {id: accountId}
//         });

//         if (!accounts) {
//             return res.status(404).json({ message: "Account Not Found" });
//         }

//         const assetTransactions = await assetTransaction.findAll({
//             where: { accountId: accountId },
//             attributes: [
//                 'holdingId',
//                 'accountId',
//                 'securityName',
//                 'holdingName',
//                 'amount',
//                 'date',
//                 'fees',
//                 'transactionDescription',
//                 'price',
//                 'quantity'
//             ]
//         });
//         const normalizedAssetTransactions = assetTransactions.reduce((acc, transactions) => {
//             acc[transactions.transactionIdentifier] = transactions;
//             return acc;
//         }, {});

//         const responseData = {
//             account: accounts,
//             assetTransactions: normalizedAssetTransactions
//         };

//         res.json(responseData);
//     } catch (error) {
//         next(error);
//     }
// });



module.exports = router;
