'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shopping_cart_details', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      cant: {
        type: Sequelize.INTEGER
      },
      total_amount: {
        type: Sequelize.DOUBLE
      },
      unit_amount: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shopping_cart_details');
  }
};