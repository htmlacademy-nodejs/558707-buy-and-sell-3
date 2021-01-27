"use strict";

const createCategoryModel = (Model, DataTypes, sequelize) => {
  class Category extends Model {}
  Category.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
  });

  return Category;
};

const createCategoryRelations = (Category, Offer) => {
  Category.belongsToMany(Offer, {
    through: `offers_categories`,
    as: `offers`,
    foreignKey: `category_id`,
  });
};

module.exports = {
  createCategoryModel,
  createCategoryRelations,
};
