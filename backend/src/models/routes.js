'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class routes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Permits.belongsTo(this);
    }
  }
  routes.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 ,
      primaryKey:true
    },
    url: DataTypes.STRING,
    icon: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    father: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'routes',
  });
  return routes;
};