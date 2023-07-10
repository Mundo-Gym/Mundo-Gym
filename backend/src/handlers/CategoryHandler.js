const {
  addCategory,
  deleteCategory,
  getAllCategory,
} = require("../controllers/CategoryController");

const addCategoryHandler = async (req, res) => {
  try {
    const { name, description, active } = req.body;

    const newCategory = await addCategory(name, description, active);
    const response = {
      ...newCategory.toJSON(),
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCategoryHandler = async (req, res) => {
  try {
    const productsWithCategory = await getAllCategory();

    res.status(200).json(productsWithCategory);
  } catch (error) {
    console.error("Error al obtener las categorías de productos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCategoryHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteCategory(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ message: "Error al borrar la Categoría" });
  }
};

module.exports = {
  addCategoryHandler,
  deleteCategoryHandler,
  getAllCategoryHandler,
};
