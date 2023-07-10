const { Subcategory } = require("../db");

const addSubcategory = async (name, description, categoryId, active) => {
  try {
    const newSubcategory = new Subcategory({
      name,
      description,
      category: categoryId,
      active: true,
    });

    // Guardar la nueva subcategoría en la base de datos
    const savedSubcategory = await newSubcategory.save();

    return savedSubcategory;
  } catch (error) {
    console.error("Error al agregar la subcategoría:", error);
    throw error;
  }
};

const getAllSubcategory = async () => {
  const subcategories = await Subcategory.findAll({
    attributes: ["id", "name"],
  });

  return subcategories;
};

const deleteSubcategory = async (id) => {
  await Subcategory.destroy({ where: { id } });
};

module.exports = {
  addSubcategory,
  deleteSubcategory,
  getAllSubcategory,
};
