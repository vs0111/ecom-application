const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getOfferProducts
} = require('../controllers/productController');

// Specific endpoints first to avoid parameter collision
router.get('/featured', getFeaturedProducts);
router.get('/offers', getOfferProducts);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;
