const Order = require('../models/Order');
const Product = require('../models/Product');

// Helper to generate readable Order ID (e.g., ORD-84920)
const generateOrderId = () => {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `ORD-${randomDigits}`;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { customerDetails, products, paymentMethod } = req.body;

    // Validation
    if (!customerDetails || !products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order submission. Customer details and products are required.'
      });
    }

    const { name, phone, email, address, city, state, pincode } = customerDetails;
    if (!name || !phone || !email || !address || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: 'All customer fields (Name, Phone, Email, Address, City, State, Pincode) are required.'
      });
    }

    // Calculate totals and verify items
    let subtotal = 0;
    const verifiedProducts = [];

    for (const item of products) {
      const dbProduct = await Product.findById(item.productId);
      if (!dbProduct) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.productId} not found.`
        });
      }

      if (dbProduct.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${dbProduct.name}". Only ${dbProduct.stock} left in stock.`
        });
      }

      const itemPrice = dbProduct.discountPrice || dbProduct.price;
      const lineTotal = itemPrice * item.quantity;
      subtotal += lineTotal;

      verifiedProducts.push({
        productId: dbProduct._id,
        name: dbProduct.name,
        price: dbProduct.price,
        discountPrice: dbProduct.discountPrice,
        variation: item.variation || '',
        quantity: item.quantity,
        image: item.image || (dbProduct.images && dbProduct.images[0]) || ''
      });

      // Deduct stock
      dbProduct.stock -= item.quantity;
      await dbProduct.save();
    }

    const shippingFee = subtotal > 1000 ? 0 : 50; // Free shipping over 1000 INR
    const totalAmount = subtotal + shippingFee;

    const newOrder = new Order({
      orderId: generateOrderId(),
      customerDetails: { name, phone, email, address, city, state, pincode },
      products: verifiedProducts,
      subtotal,
      shippingFee,
      totalAmount,
      paymentMethod: paymentMethod || 'COD',
      status: 'Pending'
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: savedOrder
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// @desc    Get order by ID or orderId
// @route   GET /api/orders/:id
// @access  Public
const getOrderById = async (req, res) => {
  try {
    const idOrOrderId = req.params.id;
    let order;

    if (idOrOrderId.startsWith('ORD-')) {
      order = await Order.findOne({ orderId: idOrOrderId });
    } else {
      order = await Order.findById(idOrOrderId);
    }

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order details',
      error: error.message
    });
  }
};

module.exports = {
  createOrder,
  getOrderById
};
