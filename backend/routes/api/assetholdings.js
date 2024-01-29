const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Account, assetHolding } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const account = require('../../db/models/account');
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

        const assetholdings = await assetHolding.findAll({
            where: { accountId: accountId },
            attributes: [
                'accountId',
                'holdingName',
                'holdingIdentifier',
                'quantity',
                'averagePricePaid',
                'positionOpenDate',
                'currency'
            ]
        });

        const normalizedAssetHoldings = assetholdings.reduce((acc, holding) => {
            acc[holding.holdingIdentifier] = holding;
            return acc;
        }, {});

        const responseData = {
            account: accounts,
            assetHoldings: normalizedAssetHoldings
        };

        res.json(responseData);
    } catch (error) {
        next(error);
    }
});


router.get('/:accountId', async (req, res, next) => {
    try {
        const accountId = req.params.accountId;
        const accounts = await Account.findOne({
            attributes: ['id', 'name', 'type'],
            where: {id: accountId}
        });

        if (!accounts) {
            return res.status(404).json({ message: "Account Not Found" });
        }

        const assetholdings = await assetHolding.findAll({
            where: { accountId: accountId },
            attributes: [
                'accountId',
                'holdingName',
                'holdingIdentifier',
                'quantity',
                'averagePricePaid',
                'positionOpenDate',
                'currency'
            ]
        });

        const normalizedAssetHoldings = assetholdings.reduce((acc, holding) => {
            acc[holding.holdingIdentifier] = holding;
            return acc;
        }, {});

        const responseData = {
            account: accounts,
            assetHoldings: normalizedAssetHoldings
        };

        res.json(responseData);
    } catch (error) {
        next(error);
    }
});



module.exports = router;
