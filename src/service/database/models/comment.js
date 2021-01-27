"use strict";

const createCommentModel = (Model, DataTypes, sequelize) => {
  class Comment extends Model {}
  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: `user_id`,
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return Comment;
};

const createCommentRelations = (Comment, User) => {
  Comment.belongsTo(User, {
    as: `user`,
    foreignKey: `user_id`,
  });
};

module.exports = {
  createCommentModel,
  createCommentRelations,
};
