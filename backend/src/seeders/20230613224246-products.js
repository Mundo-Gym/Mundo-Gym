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
    await queryInterface.bulkInsert('products', [
      {
        id: uuidv4(),
        name: "Kit Funcional",
        categoryId: findCategoria("Kits"),
        price: 1500,
        cost: 1000,
        stock: 10,
        visible: true,
        image:"https://http2.mlstatic.com/D_NQ_NP_2X_717948-MLA49795995696_042022-F.webp",
        description: "Colchoneta Gimnasia + Rueda Abdominal + Soga De Saltar",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Kit Funcional Pro.",
        categoryId: findCategoria("Kits"),
        price: 3000,
        cost: 2100,
        stock: 4,
        visible: true,
        image:"https://http2.mlstatic.com/D_NQ_NP_2X_665778-MLA54776795231_032023-F.webp",
        description: "Ideal para : Gimnasia / Fitness / Yoga / Meditación",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Kit Boxeo",
        categoryId: findCategoria("Kits"),
        price: 5000,
        cost: 3400,
        stock: 0,
        visible: false,
        image:"https://http2.mlstatic.com/D_NQ_NP_2X_645545-MLA69476448924_052023-F.webp",
        description: "Bolsa Boxeo Kickboxing Lona 90cm + Guantines + Soga",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Kit Clase",
        categoryId: findCategoria("Kits"),
        price: 12000,
        cost: 9800,
        stock: 2,
        visible: true,
        image:"https://d3ugyf2ht6aenh.cloudfront.net/stores/002/487/034/products/gap-pro1-93ccffa0c5b56113e216718080892807-480-0.webp",
        description:"Este kit de entrenamiento avanzado es ideal para aquellos que dirigen clases de entrenamiento funcional, equipate con una buena base de productos para un maximo de 10 personas",
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        id: uuidv4(),
        name: "Goma Eva",
        categoryId: findCategoria("Otros"),
        price: 20000,
        cost: 14670,
        stock: 14,
        visible: true,
        image:"https://http2.mlstatic.com/D_NQ_NP_616312-MLA47474971732_092021-O.webp",
        description: "Opción práctica, segura y duradera que proporciona una superficie cómoda y protectora para realizar actividades deportivas y de entrenamiento físico, al tiempo que ayuda a minimizar el riesgo de lesiones y brinda un entorno agradable.",
        createdAt:new Date(),
        updatedAt:new Date()
      },
    ],
    {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
