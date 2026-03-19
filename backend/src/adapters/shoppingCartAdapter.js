let ShoppingCart;
const tryRequire = (p) => {
  try { return require(p); } catch (e) { return null; }
};

// Try multiple common locations / export shapes to be resilient in mixed TS/JS project
ShoppingCart = tryRequire('../models/mongoose/ShoppingCart') ||
  (function(){ const m = tryRequire('../models/Cart') || tryRequire('../models/Cart.ts') || tryRequire('../models/Cart.js');
    if (!m) return null; return (m.Cart || m.default || m); })();

if (!ShoppingCart) {
  // Keep the original error informative for CI/devs
  throw new Error('ShoppingCart model not found. Tried ../models/mongoose/ShoppingCart and ../models/Cart(.ts|.js).');
}

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
