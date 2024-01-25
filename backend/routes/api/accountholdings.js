const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { accountHolding, Account } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router({ mergeParams: true });

router.use(restoreUser)

router.get('/', async (req, res, next) => {
    console.log("URL: ", req.url);
    console.log("Account ID: ", req.params.accountId);
    
    try {
        const accountId = req.params.accountId;
        const currentUserId = req.user.id;

        const account = await Account.findByPk(accountId, {
            attributes: [
                'id',
                'name',
                'subType',
                'type',
                'accountBalance',
                'manualFlag'
            ],
            where: { userId: currentUserId }
        });

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        const accountHoldings = await accountHolding.findAll({
            where: { accountId: accountId },
            attributes: [
                'id',
                'accountId',
                'holdingName',
                'holdingIdentifier',
                'quantity',
                'averagePricePaid',
                'positionOpenDate',
                'currency'
            ]
        });

        const normalizedAccountHoldings = accountHoldings.reduce((acc, holding) => {
            acc[holding.holdingIdentifier] = holding;
            return acc;
        }, {});

        const responseData = {
            account: account,
            accountHoldings: normalizedAccountHoldings
        };

        res.json(responseData);
    } catch (error) {
        next(error);
    }
});


router.post('/:accountId/holdings', async (req, res, next) => {
    try {
        const accountId = req.params.accountId;
        const { holdingName, holdingIdentifier, quantity, averagePricePaid, positionOpenDate, currency } = req.body;

        const newHolding = await accountHolding.create({
            accountId,
            holdingName,
            holdingIdentifier,
            quantity,
            averagePricePaid,
            positionOpenDate,
            currency
        });

        res.status(201).json(newHolding);
    } catch (error) {
        next(error);
    }
});

router.put('/:holdingId', async (req, res, next) => {
    console.log("PUT request to /accounts/:accountId/accountholdings/:holdingId", req.params);
    try {
        const { holdingId, accountId } = req.params;
        console.log(holdingId, accountId, 'HERE ARE THE GD IDS #######')
        const { holdingName, holdingIdentifier, quantity, averagePricePaid, positionOpenDate, currency } = req.body;

        const holding = await accountHolding.findOne({
            where: { id: holdingId, accountId: accountId }
        });

        if (!holding) {
            return res.status(404).json({ message: "Holding not found" });
        }

        await holding.update({
            holdingName,
            holdingIdentifier,
            quantity,
            averagePricePaid,
            positionOpenDate,
            currency
        });

        res.json({ message: "Holding updated successfully" });
    } catch (error) {
        next(error);
    }
});


router.delete('/:accountId/holdings/:holdingId', async (req, res, next) => {
    try {
        const { holdingId, accountId } = req.params;

        const holding = await accountHolding.findOne({
            where: { id: holdingId, accountId: accountId }
        });

        if (!holding) {
            return res.status(404).json({ message: "Holding not found" });
        }

        await holding.destroy();
        res.status(200).json({ message: "Holding deleted successfully" });
    } catch (error) {
        next(error);
    }
});


module.exports = router;
