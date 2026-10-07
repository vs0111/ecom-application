const mongoose = require('mongoose');

const variationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Size or Weight
  options: [{ type: String, required: true }] // e.g., ['S', 'M', 'L'] or ['500g', '1kg']
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, lowercase: true, index: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discountPrice: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, index: true },
  images: [{ type: String, required: true }],
  variations: [variationSchema],
  stock: { type: Number, required: true, default: 10, min: 0 },
  featured: { type: Boolean, default: false, index: true },
  isOffer: { type: Boolean, default: false, index: true },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  reviewCount: { type: Number, default: 12 },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: { getters: true, virtuals: true },
  toObject: { getters: true, virtuals: true }
});

module.exports = mongoose.model('Product', productSchema);
