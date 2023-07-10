const { filterProductsByCategory } = require("../controllers/filterByCategory");

const filterProductsByCategoryHandler = async (req, res) => {
  try {
    const products = await filterProductsByCategory(req);

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  filterProductsByCategoryHandler,
};
