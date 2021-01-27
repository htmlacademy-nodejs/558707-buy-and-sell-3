"use strict";

const createOfferModel = (Model, DataTypes, sequelize) => {
  class Offer extends Model {}
  Offer.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
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
      field: `created_at`,
      allowNull: false,
    },
    description: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    typeId: {
      type: DataTypes.INTEGER,
      field: `type_id`,
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
  });

  return Offer;
};

const createOfferRelations = (Offer, User, Category, Type) => {
  Offer.belongsToMany(User, {
    through: `users_offers`,
    as: `users`,
    foreignKey: `offer_id`,
  });

  Offer.belongsToMany(Category, {
    through: `offers_categories`,
    as: `categories`,
    foreignKey: `offer_id`,
  });

  Offer.belongsTo(Type, {
    as: `type`,
    foreignKey: `type_id`,
  });
};

module.exports = {
  createOfferModel,
  createOfferRelations,
};
