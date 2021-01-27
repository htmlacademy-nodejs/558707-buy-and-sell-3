"use strict";

const createUserModel = (Model, DataTypes, sequelize) => {
  class User extends Model {}
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
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
  });

  return User;
};

const createUserRelations = (User, Offer, Comment) => {
  User.belongsToMany(Offer, {
    through: `users_offers`,
    as: `offers`,
    foreignKey: `user_id`,
  });

  User.hasMany(Comment, {
    as: `comments`,
    foreignKey: `user_id`,
  });
};

module.exports = {
  createUserModel,
  createUserRelations,
};
