'use strict';
const {v4: uuidv4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [{
      id: uuidv4(),
      name: 'Kits',
      description: "",
      active: true,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      id: uuidv4(),
      name: 'Otros',
      description: "",
      active: true,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      id: uuidv4(),
      name: 'Musculacion',
      description: "",
      active: true,
      createdAt:new Date(),
      updatedAt:new Date()
    },{
      id: uuidv4(),
      name: 'Fitness',
      description: "false",
      active: true,
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
