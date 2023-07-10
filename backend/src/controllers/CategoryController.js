const { Category } = require("../db");

const addCategory = async (name, description, active) => {
  try {
    const newCategory = new Category({
      name,
      description,
      active: true,
    });

    // Guardar la nueva categoría en la base de datos
    const savedCategory = await newCategory.save();

    return savedCategory;
  } catch (error) {
    console.error("Error al agregar la categoría:", error);
    throw error;
  }
};

const getAllCategory = async () => {
  const categories = await Category.findAll({
    attributes: ["id", "name", "description", "active"],
  });

  return categories;
};

const deleteCategory = async (id) => {
  await Category.destroy({ where: { id } });
};

module.exports = {
  addCategory,
  deleteCategory,
  getAllCategory,
};
