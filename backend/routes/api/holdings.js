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
        const accounts = await Holding.findAll({
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
        res.json(accounts); 
    } catch (error) {
        next(error); 
    }
});


router.post('/:accountId/holding', restoreUser, requireAuth, async (req, res) => {
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
