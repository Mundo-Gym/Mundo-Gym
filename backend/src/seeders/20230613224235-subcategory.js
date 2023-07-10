'use strict';
const {v4: uuidv4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  let data = await queryInterface.sequelize.query(
    `SELECT id,name from categories`
  )
  data=data[0]
  const findCategoria = (categoria)=>{
    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      if(element.name === categoria){
        return element.id;
      }
    }
  }

  await queryInterface.bulkInsert('subcategories', [
      {
        id: uuidv4(),
        name: "Steps",
        description: "",
        active: true,
        categoryId:findCategoria('Fitness'),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Conos",
        description: "",
        active: true,
        categoryId:findCategoria('Fitness'),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Colchonetas",
        description: "",
        active: true,
        categoryId:findCategoria('Fitness'),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Pelotas",
        description: "",
        active: true,
        categoryId:findCategoria('Fitness'),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Mancuernas",
        description: "",
        active: true,
        categoryId:findCategoria('Musculacion'),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Bancos",
        description: "",
        active: true,
        categoryId:findCategoria('Musculacion'),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Barras",
        description: "",
        active: true,
        categoryId:findCategoria('Musculacion'),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Discos",
        description: "",
        active: true,
        categoryId:findCategoria('Musculacion'),
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Pisos",
        description: "",
        active: true,
        categoryId:findCategoria('Otros'),
        createdAt:new Date(),
        updatedAt:new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subcategories', null, {});
  }
};
