'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shopping_cart_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Shopping_cart)
      this.belongsTo(models.Products);
    }
  }
  shopping_cart_detail.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 ,
      primaryKey:true
    },
    cant: DataTypes.INTEGER,
    total_amount: DataTypes.DOUBLE,
    unit_amount: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'shopping_cart_detail',
  });
  return shopping_cart_detail;
};