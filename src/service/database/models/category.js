"use strict";

const createCategory = ({Model, DataTypes}, sequelize) => {
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

module.exports = createCategory;
