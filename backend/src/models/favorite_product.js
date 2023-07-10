'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Users,{through: this})
      this.belongsToMany(models.Products,{through: this})
      // define association here
    }
  }
  favorite_product.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 ,
      primaryKey:true
    }
  }, {
    sequelize,
    modelName: 'favorite_product',
    freezeTableName: true,
  });
  return favorite_product;
};