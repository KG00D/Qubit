const express = require('express');
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Must be a valid email address.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const userEmailExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.scope('currentUser').findOne({
    where: { email: email }
  });

  if (user) {
    const error = new Error('User with that email already exists');
    error.status = 403;
    throw error; 
  }
  next();
};

router.post('/', validateSignup, userEmailExists, async (req, res) => {
    const { email, firstName, password } = req.body;
    const user = await User.signup({ email, firstName, password });
    await setTokenCookie(res, user);
    return res.json(user);
});

router.use((err, req, res, next) => {
  if (err.status === 403) {
    return res.status(403).json({
      message: err.message,
      statusCode: err.status,
      errors: err.errors,
    });
  }
  next(err);
});

router.use((err, req, res, next) => {
  if (err.status === 400) {
    return res.status(400).json({
      message: err.message,
      statusCode: err.status,
      errors: err.errors,
    });
  }
  next(err);
});

module.exports = router;
