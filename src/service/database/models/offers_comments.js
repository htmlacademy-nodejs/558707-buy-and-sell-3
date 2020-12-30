"use strict";

module.exports = ({Model, DataTypes}, sequelize) => {
  class OfferComment extends Model {}
  OfferComment.init({
    offerId: {
      type: DataTypes.INTEGER,
      field: `offer_id`,
      allowNull: false,
    },
    commentId: {
      type: DataTypes.INTEGER,
      field: `comment_id`,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return OfferComment;
};
