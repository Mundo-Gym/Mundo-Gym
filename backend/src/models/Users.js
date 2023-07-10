"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Person_data);
      this.belongsToMany(models.Products, { through: models.Favorite_product });
      this.belongsTo(models.Shopping_cart);
      this.hasMany(models.Compra);
      this.belongsToMany(models.Products, {
        through: models.Favorite_product,
      });
    }
  }
  users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      resetPasswordToken: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
