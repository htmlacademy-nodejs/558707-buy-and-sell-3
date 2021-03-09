"use strict";

const Aliase = require(`./aliase`);

const createOfferModel = ({Model, DataTypes}, sequelize) => {
  class Offer extends Model {}
  Offer.init({
    title: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
    announce: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: `createdAt`,
      allowNull: false,
    },
    description: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    picture: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: `Offer`,
    tableName: `offers`,
  });

  return Offer;
};

const createOfferRelations = ({Offer, Comment, User, UserOffer, Category, Type, OfferCategory}) => {
  Offer.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `offerId`});
  Offer.belongsToMany(User, {through: UserOffer, as: Aliase.USERS});
  Offer.hasMany(UserOffer, {as: Aliase.USERS_OFFERS});
  Offer.belongsToMany(Category, {through: OfferCategory, as: Aliase.CATEGORIES});
  Offer.belongsTo(Type, {foreignKey: `typeId`});
};

module.exports = {
  createOfferModel,
  createOfferRelations,
};
