const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Account, Holding, Transaction } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.use(restoreUser)

router.get('/', async (req, res, next) => {
    try {
        const accounts = await Account.findAll({
            attributes: [
                'accountId',
                'name',
                'officialName',
                'subtype',
                'type',
                'availBalance',
                'currentBalance',
                'isoCurrencyCode',
                'manualFlag'
            ]
        });
        res.json(accounts); 
    } catch (error) {
        next(error); 
    }
});

router.get('/:accountId/holding', async (req, res, next) => {
    try {
        const accountId = req.params.accountId;

        const holdings = await Holding.findAll({
            where: { accountId: accountId },
            attributes: [
                'accountId',
                'securityName',
                'tickerSymbol',
                'quantity',
                'price',
                'totalValue',
                'costBasis',
                'institutionPrice',
                'institutionValue',
                'securityId',
                'manualFlag'
            ],
            // Uncomment the following if you need to include data from the Account model
            // include: [{
            //     model: Account,
            //     attributes: ['name', 'type', ...] 
            // Specify the attributes you need from Account
            // }]
        });
        res.json(holdings); 
    } catch (error) {
        next(error); 
    }
});

module.exports = router;
