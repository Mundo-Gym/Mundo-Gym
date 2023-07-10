const { getAllProducts } = require("./productsController");

const filterProductsBySubCategory = async (req) => {
  const filtersub = await getAllProducts();

  if (req.query.subcategory) {
    const subCategory = req.query.subcategory;

    filteredProducts = filtersub.filter((product) => {
      if (product.dataValues.subcategories.length > 0) {
        return product.dataValues.subcategories[0].name === subCategory
          ? product.dataValues.subcategories[0].name
          : "";
      }
    });
  }

  return filteredProducts;
};

module.exports = { filterProductsBySubCategory };
