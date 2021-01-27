"use strict";

const createTypeModel = (Model, DataTypes, sequelize) => {
  class Type extends Model {}
  Type.init({
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

  return Type;
};

const createTypeRelations = (Type, Offer) => {
  Type.hasMany(Offer, {
    as: `offers`,
    foreignKey: `type_id`,
  });
};

module.exports = {
  createTypeModel,
  createTypeRelations,
};
