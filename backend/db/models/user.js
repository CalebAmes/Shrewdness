"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      bio: {
        type: DataTypes.STRING
      },
      avatar: {
        type: DataTypes.STRING
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
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
  User.associate = function(models) {
    // associations can be defined here
    const columnMapping = {
      through: "UserGroupJoin",
      otherKey: "groupId",
      foreignKey: "userId"
    };

    User.hasMany(models.DirectMessage, { foreignKey: "userOneId" });
    User.hasMany(models.DirectMessage, { foreignKey: "userTwoId" });

    User.belongsToMany(models.Group, columnMapping);

    User.hasMany(models.ChannelMessage, { foreignKey: "userId" });

    User.hasMany(models.Notification, { foreignKey: "userId" });
  };
  User.prototype.toSafeObject = function() {
    const { id, username, email } = this;
    return { id, username, email };
  };

  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function(id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function({ username, email, bio, avatar, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      bio,
      avatar,
      hashedPassword
    });

    return await User.scope("currentUser").findByPk(user.id);
  };
  return User;
};
