'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class person_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  person_data.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4 ,
      primaryKey:true
    },
    dni: DataTypes.STRING,
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email:DataTypes.STRING,
    gender: DataTypes.STRING,
    date_born: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'person_data',
    freezeTableName: true,
    timestamps: false,
  });
  return person_data;
};