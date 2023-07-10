const { Products, Category } = require("../db");

const filterProductsByCategory = async (req) => {
  let filteredProducts = await Products.findAll({
    include: {
      model: Category,
      attributes: ["name"],
    },
  });

  if (req.query.category) {
    const category = req.query.category;
    filteredProducts = filteredProducts.filter(
      (product) => product.category && product.category.name === category
    );
  }

  return filteredProducts;
};

module.exports = { filterProductsByCategory };
