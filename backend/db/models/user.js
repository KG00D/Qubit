'use strict';
const bcrypt = require('bcryptjs');
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, email } = this; 
      return { id, email };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ email, password, firstName}) {
      const hashedPassword = bcrypt.hashSync(password);
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
        monthlyCarPayment,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    validateSync() {
      const errors = {};
      if (!this.firstName) {
        errors.firstName = 'First name is required.';
      }
      if (!this.email) {
        errors.email = 'Email is required.';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
          errors.email = `${this.email} is not a valid email address.`;
        }
      }
      if (Object.keys(errors).length > 0) {
        return new Error(JSON.stringify(errors));
      }
      return null;
    }

    static associate(models) {
      User.hasMany(models.Account, { foreignKey: 'userId' }),
      User.hasMany(models.Debt, {foreignKey: 'userId'})
    }
  };

  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [3, 255],
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [6, 512],
      },
    },
    monthlyIncome: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    debtAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    nonSecuredDebtPayments: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    creditScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    housingSituation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    monthlyHousingPayment: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    carOwnership: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    carYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carMake: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    carModel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    monthlyCarPayment: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 512],
      },
    },
  },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};