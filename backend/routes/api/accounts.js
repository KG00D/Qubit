const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Account } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.use(restoreUser)
// const userId = 1;

router.get('/', async (req, res, next) => {
    try {
        const accounts = await Account.findAll({
            // where: {userId: userId},
            attributes: [
                'name',
                'subType',
                'type',
                'accountBalance',
                'manualFlag'
            ]
        });
        res.json(accounts); 
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

router.put('/', requireAuth, async (req, res) => {
    try {
        const { userId, name, subType, type, accountBalance, manualFlag } = req.body;
        const newAccount = await Account.create({
            userId: req.user.id, name, subType, typpe, accountBalance, manualFlag
        });
        return res.json({ accountId: newAccount.id}) 
    } catch (error) {
        next(error); 
    }
});

router.delete('/:accountId', requireAuth, async (req, res) => {
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
