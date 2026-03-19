const { Schema, model, models } = require('mongoose');

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, default: 0 },
  image: { type: String },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  subcategory: { type: Schema.Types.ObjectId, ref: 'Subcategory' },
  stock: { type: Number, default: 0 },
  slug: { type: String },
  visible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = models.Product || model('Product', productSchema);
