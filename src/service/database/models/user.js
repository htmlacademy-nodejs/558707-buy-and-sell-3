"use strict";

const createUser = ({Model, DataTypes}, sequelize) => {
  class User extends Model {}
  User.init({
    name: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: `User`,
    tableName: `users`,
  });

  return User;
};

module.exports = createUser;
