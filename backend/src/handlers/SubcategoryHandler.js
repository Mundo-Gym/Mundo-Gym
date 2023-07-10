const {
  addSubcategory,
  deleteSubcategory,
  getAllSubcategory,
} = require("../controllers/SubcategoryController");

const addSubcategoryHandler = async (req, res) => {
  try {
    const { name, description, categoryId, active } = req.body;

    const newSubcategory = await addSubcategory(
      name,
      description,
      categoryId,
      active
    );
    const response = {
      ...newSubcategory.toJSON(),
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSubcategoryHandler = async (req, res) => {
  try {
    const productsWithCategory = await getAllSubcategory();

    res.status(200).json(productsWithCategory);
  } catch (error) {
    console.error("Error al obtener las Subcategorías de productos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteSubcategoryHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteSubcategory(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ message: "Error al borrar la Subcategoría" });
  }
};

module.exports = {
  addSubcategoryHandler,
  deleteSubcategoryHandler,
  getAllSubcategoryHandler,
};
