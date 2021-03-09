"use strict";

const Aliase = require(`./aliase`);

const createCategoryModel = ({Model, DataTypes}, sequelize) => {
  class Category extends Model {}
  Category.init({
    name: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: `Category`,
    tableName: `categories`,
  });

  return Category;
};

const createCategoryRelations = ({Category, Offer, OfferCategory}) => {
  Category.belongsToMany(Offer, {through: OfferCategory, as: Aliase.OFFERS});
  Category.hasMany(OfferCategory, {as: Aliase.OFFER_CATEGORIES});
};

module.exports = {
  createCategoryModel,
  createCategoryRelations,
};
