"use strict";

const createOffer = ({Model, DataTypes}, sequelize) => {
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

module.exports = createOffer;
