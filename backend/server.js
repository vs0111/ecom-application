const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Route imports
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Models & Seed Data for API seed endpoint
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const { categories, products } = require('./data/seedData');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// API Root Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'E-Commerce API Service Running Cleanly' });
});

// Seed API endpoint for easy data reset/initialization
app.all('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    await Order.deleteMany();

    const createdCategories = await Category.insertMany(categories);
    const createdProducts = await Product.insertMany(products);

    res.status(200).json({
      success: true,
      message: 'Database seeded successfully',
      categoriesCount: createdCategories.length,
      productsCount: createdProducts.length
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Seeding failed', error: error.message });
  }
});

// Routes Mounting
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);

// 404 Fallback
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
