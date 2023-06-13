"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/encryption");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required",
          },
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Must be a valid email address",
          },
        },
        unique: {
          msg: "This email is already taken",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6],
            msg: "Password must be at least 6 characters",
          },
          validatePassword: (password) => {
            if (!/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/.test(password)) {
              throw new Error(
                "The password must contain at least 1 uppercase, 1 lowercase, and 1 number."
              );
            }
          },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [18],
            msg: "Age must be at least 18",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, _) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
