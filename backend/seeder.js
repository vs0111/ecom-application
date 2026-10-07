const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const { categories, products } = require('./data/seedData');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    await Category.deleteMany();
    await Order.deleteMany();

    console.log('Database cleared...');

    // Seed Categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`${createdCategories.length} categories seeded successfully!`);

    // Seed Products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products seeded successfully!`);

    console.log('Data Seeding Completed Cleanly!');
    process.exit(0);
  } catch (error) {
    console.error(`Error during seeding: ${error.message}`);
    process.exit(1);
  }
};

importData();
