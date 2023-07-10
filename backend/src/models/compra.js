"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: "userId" });
      this.belongsToMany(models.Products, { through: models.CompraProduct });
    }
  }
  Compra.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Compra",
    }
  );
  return Compra;
};
