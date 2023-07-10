const { shopping_cart, shopping_cart_detail, Products } = require("../models");

// Controlador para obtener el carrito de compras
exports.getShoppingCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const shoppingCart = await shopping_cart.findOne({
      where: { userId },
      include: [
        {
          model: shopping_cart_detail,
          as: "details",
          include: { model: Products, as: "product" },
        },
      ],
    });

    res.json(shoppingCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el carrito de compras" });
  }
};

// Controlador para agregar un producto al carrito de compras
exports.addProductToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Verificar si el carrito de compras existe para el usuario
    let shoppingCart = await shopping_cart.findOne({ where: { userId } });

    if (!shoppingCart) {
      // Si no existe, crear un nuevo carrito de compras
      shoppingCart = await shopping_cart.create({ userId });
    }

    // Verificar si el producto ya está en el carrito
    const cartDetail = await shopping_cart_detail.findOne({
      where: { shopping_cart_id: shoppingCart.id, product_id: productId },
    });

    if (cartDetail) {
      // Si el producto ya está en el carrito, actualizar la cantidad
      cartDetail.quantity += quantity;
      await cartDetail.save();
    } else {
      // Si el producto no está en el carrito, agregarlo como un nuevo detalle
      await shopping_cart_detail.create({
        shopping_cart_id: shoppingCart.id,
        product_id: productId,
        quantity,
      });
    }

    res
      .status(200)
      .json({ message: "Producto agregado al carrito de compras" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al agregar el producto al carrito de compras" });
  }
};

// Controlador para eliminar un producto del carrito de compras
exports.removeProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Buscar el carrito de compras del usuario
    const shoppingCart = await shopping_cart.findOne({ where: { userId } });

    if (!shoppingCart) {
      // Si no hay carrito de compras, retornar un mensaje de error
      return res
        .status(404)
        .json({ error: "Carrito de compras no encontrado" });
    }

    // Buscar el detalle del producto en el carrito
    const cartDetail = await shopping_cart_detail.findOne({
      where: { shopping_cart_id: shoppingCart.id, product_id: productId },
    });

    if (!cartDetail) {
      // Si el detalle no existe, retornar un mensaje de error
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito de compras" });
    }

    // Eliminar el detalle del producto del carrito
    await cartDetail.destroy();

    res
      .status(200)
      .json({ message: "Producto eliminado del carrito de compras" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar el producto del carrito de compras" });
  }
};
