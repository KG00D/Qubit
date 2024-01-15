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
        const assetholdings = await assetHolding.findAll({
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
        const responseData = {
            account: account,
            assetholdings: assetholdings
        };

        res.json(responseData);
    } catch (error) {
        next(error);
    }
});

router.get('/assetholdings/:accountId', async (req, res, next) => {
    try {
        const accountId = req.params.accountId;
        const accounts = await Account.findOne({
            attributes: ['id', 'name', 'type'],
            where: {id: accountId}
        })
        if (!accounts) {
            return res.status(404).json({ message: "Account Not Found"})
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
        const responseData = {
            account: account,
            assetholdings: assetholdings
        };

        res.json(responseData);
    } catch (error) {
        next(error);
    }
});


router.post('/:accountId/assetholdings', restoreUser, requireAuth, async (req, res) => {
    try {
        const { accountId, name, officialName, subtype, type, availBalance, 
        currentBalance, isoCurrencyCode, manualFlag } = req.body;
        const newAccount = await Account.create({
            accountId,
            name,
            officialName,
            subtype,
            type,
            availBalance,
            currentBalance,
            isoCurrencyCode,
            manualFlag
        });
        return res.status(201).json(newAccount);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router;
