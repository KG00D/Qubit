const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Account, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.use(restoreUser)

router.get('/:id', async (req, res, next) => {
    console.log('account id is ', req.params.id)
    try {
        const id = req.params.id;
        const currentUserId = req.user.id;

        const account = await Account.findByPk(id, {
            attributes: [
                'name',
                'subType',
                'type',
                'accountBalance',
                'manualFlag'
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

router.get('/', async (req, res, next) => {
    try {
        const currentUserId = req.user.id;
        const accounts = await Account.findAll({
            attributes: [
                'name',
                'subType',
                'type',
                'accountBalance',
                'manualFlag'
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
    try {
        const { name, subType, type, accountBalance, manualFlag } = req.body;
        const newAccount = await Account.create({
            userId: req.user.id, 
            name, 
            subType, 
            type, 
            accountBalance, 
            manualFlag
        });
        return res.json({ accountId: newAccount.id}) 
    } catch (error) {
        next(error); 
    }
});

router.put('/:id', requireAuth, async (req, res) => {
    try {
        const { currentUserId, name, subType, type, accountBalance, manualFlag } = req.body;
        const newAccount = await Account.updatw({
            userId: req.user.id, name, subType, type, accountBalance, manualFlag
        });
        return res.json({ accountId: newAccount.id}) 
    } catch (error) {
        next(error); 
    }
});

router.delete('/:id', requireAuth, async (req, res) => {
    try {
      const id = req.params.accountId;
      const userId = req.user.id;
      const group = await Account.findByPk(id);
  
      if (!group) {
        return res.status(404).json({ message: "Account couldn't be found" });
      }
  
      if (userId === group.organizerId) {
        await group.destroy();
        return res.status(200).json({ message: "Successfully deleted" });
      } else {
        return res.status(403).json({ message: "No dice" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
