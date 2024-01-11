
const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Account, Holding, Transaction } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.use(restoreUser)



router.get('/:holdingId/transaction', async (req, res, next) => {
    try {
        const holdingId = req.params.holdingId;

        const transactions = await Holding.findAll({
            where: { holdingId: holdingId },
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
        res.json(transactions); 
    } catch (error) {
        next(error); 
    }
});
