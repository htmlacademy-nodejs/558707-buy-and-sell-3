"use strict";

const Aliase = require(`./aliase`);

const createUserModel = ({Model, DataTypes}, sequelize) => {
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

const createUserRelations = ({User, Comment, Offer, UserOffer}) => {
  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `userId`});
  User.belongsToMany(Offer, {through: UserOffer, as: Aliase.OFFERS});
};

module.exports = {
  createUserModel,
  createUserRelations,
};
