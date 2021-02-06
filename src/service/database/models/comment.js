"use strict";

const createComment = ({Model, DataTypes}, sequelize) => {
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

module.exports = createComment;
