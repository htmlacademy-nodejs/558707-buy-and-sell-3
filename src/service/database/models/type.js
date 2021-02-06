"use strict";

const createType = ({Model, DataTypes}, sequelize) => {
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

module.exports = createType;
