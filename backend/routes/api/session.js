const express = require('express');
const router = express.Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors,
];

router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.login({ email, password });

    if (!user) {
      const errorObj = {
        message: 'Invalid credentials',
        statusCode: 401
      }
      return res.status(401).json(errorObj);
    }

    await setTokenCookie(res, user);
    console.log('Response Data:', user);

    return res.json({
      user
    });
  }
);

router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({ user: user.toSafeObject(),})
        }
  else {
    return res.json({ user: null });
  }
});

module.exports = router;
