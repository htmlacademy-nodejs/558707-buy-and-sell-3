"use strict";

module.exports = ({Model, DataTypes}, sequelize) => {
  class OfferCategory extends Model {}
  OfferCategory.init({
    offerId: {
      type: DataTypes.INTEGER,
      field: `offer_id`,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: `category_id`,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return OfferCategory;
};
