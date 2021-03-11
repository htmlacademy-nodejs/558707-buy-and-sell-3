"use strict";

const createCommentModel = ({Model, DataTypes}, sequelize) => {
  class Comment extends Model {}
  Comment.init({
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: `Comment`,
    tableName: `comments`,
  });

  return Comment;
};

const createCommentRelations = ({Comment, User, Offer}) => {
  Comment.belongsTo(User, {foreignKey: `userId`});
  Comment.belongsTo(Offer, {foreignKey: `offerId`});
};

module.exports = {
  createCommentModel,
  createCommentRelations,
};
