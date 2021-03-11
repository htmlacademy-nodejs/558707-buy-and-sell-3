"use strict";

const Aliase = require(`./aliase`);

const createTypeModel = ({Model, DataTypes}, sequelize) => {
  class Type extends Model {}
  Type.init({
    name: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
  }, {
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: `Type`,
    tableName: `types`,
  });

  return Type;
};

const createTypeRelations = ({Type, Offer}) => {
  Type.hasMany(Offer, {as: Aliase.OFFERS, foreignKey: `typeId`});
};

module.exports = {
  createTypeModel,
  createTypeRelations,
};
