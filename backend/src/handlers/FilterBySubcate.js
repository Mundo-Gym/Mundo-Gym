const { filterProductsBySubCategory } = require("../controllers/FilterSub");

const filterSubCategory = async (req, res) => {
  try {
    const products = await filterProductsBySubCategory(req);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  filterSubCategory,
};
