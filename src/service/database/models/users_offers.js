"use strict";

module.exports = ({Model, DataTypes}, sequelize) => {
  class UserOffer extends Model {}
  UserOffer.init({
    userId: {
      type: DataTypes.INTEGER,
      field: `user_id`,
      allowNull: false,
    },
    offerId: {
      type: DataTypes.INTEGER,
      field: `offer_id`,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return UserOffer;
};
