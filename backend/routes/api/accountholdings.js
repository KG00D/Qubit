const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { accountHolding, Account } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router({ mergeParams: true });

router.use(restoreUser)

router.get('/', async (req, res, next) => {
    
    try {
        const accountId = req.params.accountId;
        const currentUserId = req.user.id;

        const account = await Account.findByPk(accountId, {
            attributes: [
                'id',
                'name',
                'subType',
                'type',
                'accountBalance'
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
                'securityName',
                'currentValue',
                'holdingName',
                'quantity',
                'averagePricePaid',
                'totalCost',
                'positionOpenDate',
            ]
        });

        const normalizedAccountHoldings = accountHoldings.map(holding => ({
            ...holding.toJSON(), 
                currentValue: parseFloat(holding.currentValue),
                quantity: parseFloat(holding.quantity),
                averagePricePaid: parseFloat(holding.averagePricePaid),
                totalCost: parseFloat(holding.totalCost)
            }));

        console.log(normalizedAccountHoldings, 'holdings hereeeeee');
        const responseData = {
            account: account,
            accountHoldings: normalizedAccountHoldings
        };

        res.json(responseData);
    } catch (error) {
        next(error);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const accountId = req.params.accountId;
        let { securityName,
            holdingName,
            quantity,
            currentValue,
            totalCost,
            averagePricePaid,
            positionOpenDate } = req.body;
        
        quantity = parseFloat(quantity);
        currentValue = parseFloat(currentValue);
        totalCost = parseFloat(totalCost);
        averagePricePaid = parseFloat(averagePricePaid);
        console.log(quantity, currentValue, totalCost, averagePricePaid, 'TYPES HERE')

        const newHolding = await accountHolding.create({
            accountId,
            securityName,
            holdingName,
            quantity,
            currentValue,
            totalCost,
            averagePricePaid,
            positionOpenDate,
        });
        console.log(newHolding, 'New holding being created')
        res.status(201).json(newHolding);
    } catch (error) {
        next(error);
    }
});

router.put('/:holdingId', async (req, res, next) => {
    try {
        const { holdingId, accountId } = req.params;
        const { securityName,
            holdingName,
            quantity,
            currentValue,
            averagePricePaid,
            totalCost,
            positionOpenDate } = req.body;

        const holding = await accountHolding.findOne({
            where: { id: holdingId, accountId: accountId }
        });

        if (!holding) {
            return res.status(404).json({ message: "Holding not found" });
        }

        await holding.update({
            securityName,
            holdingName,
            quantity,
            currentValue,
            averagePricePaid,
            totalCost,
            positionOpenDate
        });

        res.json({ message: "Holding updated successfully" });
    } catch (error) {
        next(error);
    }
});


router.delete('/:holdingId', async (req, res, next) => {
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
