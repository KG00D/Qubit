const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// Backend validation for signup
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('firstname')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('monthlyIncome')
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage('Please provide a valid monthly income.'),
  check('debtAmount')
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage('Please provide a valid total debt amount.'),
  check('nonSecuredDebtPayments')
    .exists({ checkFalsy: true })
    .isNumeric()
    .withMessage('Please provide a valid total monthly non-secured debt payment.'),
  check('creditScore')
    .optional()
    .isInt({ min: 300, max: 850 }) 
    .withMessage('Please provide a valid credit score.'),
  check('housingSituation')
    .exists({ checkFalsy: true })
    .withMessage('Housing situation is required.'),
  check('monthlyHousingPayment')
    .optional()
    .isNumeric()
    .withMessage('Please provide a valid monthly housing payment.'),
  check('carOwnership')
    .exists({ checkFalsy: true })
    .isIn(['Yes', 'No'])
    .withMessage('Car ownership must be either "Yes" or "No".'),
  check('carYear')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() }) 
    .withMessage('Please provide a valid car year.'),
  check('carMake')
    .optional()
    .isString()
    .withMessage('Please provide a valid car make.'),
  check('carModel')
    .optional()
    .isString()
    .withMessage('Please provide a valid car model.'),
  check('monthlyCarPayment')
    .optional()
    .isNumeric()
    .withMessage('Please provide a valid monthly car payment.'),
  handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
  const {
    email,
    firstname: firstName,
    password,
    monthlyIncome,
    debtAmount,
    nonSecuredDebtPayments,
    creditScore,
    housingSituation,
    monthlyHousingPayment,
    carOwnership,
    carYear,
    carMake,
    carModel,
    monthlyCarPayment
  } = req.body;

  const hashedPassword = bcrypt.hashSync(password);
  try {
    const user = await User.create({
      email,
      firstName,
      hashedPassword,
      monthlyIncome,
      debtAmount,
      nonSecuredDebtPayments,
      creditScore,
      housingSituation,
      monthlyHousingPayment,
      carOwnership,
      carYear,
      carMake,
      carModel,
      monthlyCarPayment
    });

    const safeUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      monthlyIncome: user.monthlyIncome,
      debtAmount: user.debtAmount,
      nonSecuredDebtPayments: user.nonSecuredDebtPayments,
      creditScore: user.creditScore,
      housingSituation: user.housingSituation,
      monthlyHousingPayment: user.monthlyHousingPayment,
      carOwnership: user.carOwnership,
      carYear: user.carYear,
      carMake: user.carMake,
      carModel: user.carModel,
      monthlyCarPayment: user.monthlyCarPayment
    };

    await setTokenCookie(res, safeUser);

    return res.json({
      user: safeUser
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Restore session user
router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
        };
        return res.json({
            user: safeUser
        });
    } else return res.json({ user: null });
});

router.get('/me', requireAuth, async (req, res, next) => {
    const currentUserId = req.user.id; 

    try {
        const user = await User.findByPk(currentUserId, {
            attributes: [
                'id',
                'email',
                'firstName',
                'monthlyIncome',
                'debtAmount',
                'nonSecuredDebtPayments',
                'creditScore',
                'housingSituation',
                'monthlyHousingPayment',
                'carOwnership',
                'carYear',
                'carMake',
                'carModel',
                'monthlyCarPayment',
            ]
        });

        if (user) {
            res.json(user); 
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        next(error);
    }
});

module.exports = router;
