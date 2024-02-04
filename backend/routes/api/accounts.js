const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Account, accountHolding } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.use(restoreUser)

router.get('/:id', requireAuth, async (req, res, next) => {
    try {
        const id = req.params.id;
        const currentUserId = req.user.id;

        const account = await Account.findByPk(id, {
            attributes: [
                'id',
                'name',
                'subType',
                'type',
            ],
            where: { userId: currentUserId }
        });
        if (account) {
            res.json(account);
        } else {
            res.status(404).json({ message: "Account not found" });
        }
    } catch (error) {
        next(error); 
    }
});


router.get('/', requireAuth, async (req, res, next) => {
    try {
        const currentUserId = req.user.id;
        const accounts = await Account.findAll({
            attributes: [
                'id',
                'name',
                'subType',
                'type'
            ],
            where: { userId: currentUserId }
        });

        if (accounts && accounts.length > 0) {
            res.json(accounts);
        } else {
            res.status(404).json({ message: "No accounts found for this user." });
        }
    } catch (error) {
        next(error); 
    }
});

router.post('/', requireAuth, async (req, res, next) => {
    console.log('Received data:', req.body);
    try {
        const { name, subType, type } = req.body;

        console.log('Extracted fields:', { name, subType, type });

        const newAccount = await Account.create({
            userId: req.user.id, 
            name, 
            subType, 
            type
        });
        return res.json({ accountId: newAccount.id}) 
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
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

router.put('/:id', requireAuth, async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const { name, subType, type } = req.body;

        const account = await Account.findByPk(id);
        
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (account.userId !== userId) {
            return res.status(403).json({ message: "You do not have permission to update this account" });
        }

        const updatedAccount = await account.update({ name, subType, type });

        return res.json({
            id: updatedAccount.id,
            name: updatedAccount.name,
            subType: updatedAccount.subType,
            type: updatedAccount.type,
            message: "Account updated successfully"
        }); 
    } catch (error) {
        next(error); 
    }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;

        const account = await Account.findByPk(id);

        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        if (account.userId !== userId) {
            return res.status(403).json({ message: "You do not have permission to delete this account" });
        }

        await account.destroy();
        return res.status(200).json({ message: "Account successfully deleted" });
    } catch (error) {
        next(error); 
    }
});

module.exports = router;
