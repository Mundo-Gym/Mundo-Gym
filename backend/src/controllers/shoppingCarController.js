// OLD_SEQUELIZE: original Sequelize implementation (kept for reference)
// OLD_SEQUELIZE: const { shopping_cart, shopping_cart_detail, Products } = require("../models");
// OLD_SEQUELIZE: (see history) - used Sequelize models shopping_cart and shopping_cart_detail

const shoppingCartAdapter = require("../adapters/shoppingCartAdapter");
const productsAdapter = require("../adapters/productsAdapter");

// Controlador para obtener el carrito de compras
exports.getShoppingCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const shoppingCart = await shoppingCartAdapter.findByUserId(userId);

    return res.json(shoppingCart);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener el carrito de compras" });
  }
};

// Controlador para agregar un producto al carrito de compras
exports.addProductToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Obtener o crear carrito
    let shoppingCart = await shoppingCartAdapter.findByUserId(userId);
    if (!shoppingCart) {
      shoppingCart = await shoppingCartAdapter.createCartForUser(userId);
    }

    // Obtener producto para precio (si existe)
    const product = await productsAdapter.findById(productId);
    const price = product && product.price ? product.price : 0;

    await shoppingCartAdapter.addItem(shoppingCart, productId, quantity, price);

    return res.status(200).json({ message: "Producto agregado al carrito de compras" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al agregar el producto al carrito de compras" });
  }
};

// Controlador para eliminar un producto del carrito de compras
exports.removeProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Buscar el carrito de compras del usuario
    const shoppingCart = await shoppingCartAdapter.findByUserId(userId);

    if (!shoppingCart) {
      return res.status(404).json({ error: "Carrito de compras no encontrado" });
    }

    await shoppingCartAdapter.removeItem(shoppingCart, productId);

    return res.status(200).json({ message: "Producto eliminado del carrito de compras" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al eliminar el producto del carrito de compras" });
  }
};

// Merge local cart into user's server cart
exports.mergeCart = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.body.userId;
    const localItems = req.body.items || [];

    if (!userId) return res.status(400).json({ error: "User id missing for merge" });

    let shoppingCart = await shoppingCartAdapter.findByUserId(userId);
    if (!shoppingCart) {
      shoppingCart = await shoppingCartAdapter.createCartForUser(userId);
    }

    // localItems expected: [{ productId, quantity }]
    for (const it of localItems) {
      const productId = it.productId || it.product || it.id;
      const qty = parseInt(it.quantity, 10) || 1;
      const product = await productsAdapter.findById(productId);
      const price = product && product.price ? product.price : 0;
      await shoppingCartAdapter.addItem(shoppingCart, productId, qty, price);
    }

    const updated = await shoppingCartAdapter.findByUserId(userId);
    return res.status(200).json({ message: "Cart merged", cart: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error merging cart" });
  }
};
