"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Users, { through: models.Favorite_product });
      this.belongsTo(models.Category);
      this.belongsToMany(models.Subcategory, {
        through: "subcategory_product",
      });
      this.hasMany(models.Review, { foreignKey: "productId" });
      this.belongsToMany(models.Compra, { through: models.CompraProduct });
    }
  }
  products.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      cost: DataTypes.DOUBLE,
      stock: DataTypes.INTEGER,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      visible: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "products",
    }
  );
  return products;
};
