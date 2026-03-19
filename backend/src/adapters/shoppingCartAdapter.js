const CartModule = require('../models/Cart');
const ShoppingCart = CartModule && (CartModule.Cart || CartModule.default || CartModule);

module.exports = {
  findByUserId: (userId) => ShoppingCart.findOne({ user: userId }).populate('items.product'),
  createCartForUser: (userId) => {
    const c = new ShoppingCart({ user: userId, items: [] });
    return c.save();
  },
  save: (cart) => cart.save(),
  addItem: async (cart, product, quantity, price) => {
    const idx = cart.items.findIndex(i => String(i.product) === String(product));
    if (idx >= 0) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ product, quantity, price });
    }
    return cart.save();
  },
  removeItem: async (cart, productId) => {
    cart.items = cart.items.filter(i => String(i.product) !== String(productId));
    return cart.save();
  }
};
