const Product = require('../models/Product');

// @desc    Get all products with search, filter, sort & pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, search, q, minPrice, maxPrice, sort, featured, isOffer, limit, page } = req.query;
    
    const query = {};

    // Category filter
    if (category && category !== 'all') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    // Search filter
    const searchQuery = search || q;
    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { category: { $regex: searchQuery, $options: 'i' } }
      ];
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.discountPrice = {};
      if (minPrice) query.discountPrice.$gte = Number(minPrice);
      if (maxPrice) query.discountPrice.$lte = Number(maxPrice);
    }

    // Featured filter
    if (featured === 'true' || featured === true) {
      query.featured = true;
    }

    // Offers filter
    if (isOffer === 'true' || isOffer === true) {
      query.isOffer = true;
    }

    // Sorting
    let sortOptions = {};
    if (sort === 'price-low') {
      sortOptions = { discountPrice: 1 };
    } else if (sort === 'price-high') {
      sortOptions = { discountPrice: -1 };
    } else if (sort === 'newest') {
      sortOptions = { createdAt: -1 };
    } else if (sort === 'popular') {
      sortOptions = { rating: -1, reviewCount: -1 };
    } else {
      sortOptions = { createdAt: -1 };
    }

    const pageSize = Number(limit) || 20;
    const pageNum = Number(page) || 1;
    const skip = (pageNum - 1) * pageSize;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(pageSize)
      .skip(skip);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / pageSize),
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching products',
      error: error.message
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id of ${req.params.id}`
      });
    }

    // Fetch related products in same category
    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    }).limit(4);

    res.status(200).json({
      success: true,
      data: product,
      related
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Invalid product ID format'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server Error fetching product details',
      error: error.message
    });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.category;
    const products = await Product.find({
      category: { $regex: new RegExp(`^${categoryName}$`, 'i') }
    });

    res.status(200).json({
      success: true,
      count: products.length,
      category: categoryName,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching category products',
      error: error.message
    });
  }
};

// @desc    Search products with suggestions
// @route   GET /api/products/search?q=
// @access  Public
const searchProducts = async (req, res) => {
  try {
    const queryTerm = req.query.q || '';

    if (!queryTerm || queryTerm.trim() === '') {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
        suggestions: []
      });
    }

    const regex = new RegExp(queryTerm, 'i');
    const products = await Product.find({
      $or: [
        { name: regex },
        { description: regex },
        { category: regex }
      ]
    }).limit(12);

    const suggestions = products.map(p => ({
      id: p._id,
      name: p.name,
      category: p.category,
      image: p.images[0],
      price: p.discountPrice
    }));

    res.status(200).json({
      success: true,
      count: products.length,
      query: queryTerm,
      data: products,
      suggestions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error performing search',
      error: error.message
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(8);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching featured products',
      error: error.message
    });
  }
};

// @desc    Get offer products
// @route   GET /api/products/offers
// @access  Public
const getOfferProducts = async (req, res) => {
  try {
    const products = await Product.find({ isOffer: true }).limit(8);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error fetching offer products',
      error: error.message
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getOfferProducts
};
