const {
  deleteProducts,
  createProducts,
  getAllProducts,
  getProductsId,
  updateProducts,
  disabledProducts,
} = require("../controllers/productsController");

const createProductsHandler = async (req, res) => {
  try {
    const createdProduct = await createProducts(req, res);

    res.json(createdProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const products = await getAllProducts();
      return products.length
        ? res.status(200).json(products)
        : res.status(400).json({ error: error.message });
    } else {
      const nameProd = await getAllProducts();
      const searchName = nameProd.filter(
        (prod) => prod.name.toLowerCase().includes(name.toLowerCase()) //toLowerCase verifica las mayusculas minusculas, y includes lo que hace es que verifica si lo que pasamos por query esta en el string de name
      );
      searchName.length
        ? res.status(200).send(searchName)
        : res.status(400).send(error.message);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getProductIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const produsctId = await getProductsId(id);
    return produsctId
      ? res.status(200).json(produsctId.dataValues)
      : res.status(400).json({ error: error.message });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const deleteProductsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteProducts(id);
    res.json(response);
  } catch (error) {
    res.status(500).send({ message: "Error al borrar el producto" });
  }
};

const updateProductsHandler = async (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;
  try {
    const response = await updateProducts(id, newProduct);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar el producto" });
  }
};

const disableProductsHandler = async (req, res) => {
  const { id } = req.body;
  try {
    const response = await disabledProducts(id);
    console.log(response)
    res.status(200).json('actualizado')
  } catch (error) {
    console.log(error.message)
  }

};

module.exports = {
  deleteProductsHandler,
  createProductsHandler,
  getProductsHandler,
  getProductIdHandler,
  updateProductsHandler,
  disableProductsHandler,
};
