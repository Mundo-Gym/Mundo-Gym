'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users);
    }
  }
  permits.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 ,
      primaryKey:true
    },
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'permits',
  });
  return permits;
};