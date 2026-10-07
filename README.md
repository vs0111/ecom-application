# 🛒 ShopVibe E-Commerce Application

A production-grade, full-stack E-Commerce web application built using **Next.js (React)**, **Node.js (Express)**, **REST APIs**, and **MongoDB**. Designed according to the complete requirements specified in the Developer Interview Task.

![Repository URL](https://img.shields.io/badge/GitHub-vs0111%2Fecom--application-blue?logo=github)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20Node.js%20%7C%20MongoDB-emerald)
![License](https://img.shields.io/badge/License-MIT-purple)

---

## 🌟 Overview & Features

### 🎨 1. Design & Layout
* **Hero Section**: Full-width interactive hero banner featuring live product highlights, discount badges, and CTA buttons.
* **Product Categories Grid**: Visual category grid with category-based filtering.
* **Featured & Best-Selling Products**: Dynamic products loaded from backend MongoDB database with rating, discounts, and instant "Add to Cart".
* **Offers & Discounts**: Dedicated flash sale promotional section with live timer and dynamic offer items.
* **Customer Testimonials**: Responsive review section highlighting customer feedback and verified buyer badges.
* **Header & Footer**: Live instant search bar with autocomplete dropdown, responsive cart drawer, wishlist counter badge, value proposition banners, and quick links.

### 🔍 2. Product Management & REST API
* `GET /api/products`: Retrieve all products with pagination, category filter, price range, search query, and sorting.
* `GET /api/products/:id`: Get detailed single product info along with related products in the same category.
* `GET /api/products/category/:category`: Filter products by category slug.
* `GET /api/products/search?q=`: Perform live text search across titles, descriptions, and categories with autocomplete suggestions.
* `GET /api/products/featured`: Retrieve top featured products.
* `GET /api/products/offers`: Retrieve promotional deal products.
* `GET /api/categories`: Retrieve all categories.
* `POST /api/orders`: Place a new order with stock validation and COD payment.
* `GET /api/orders/:id`: Fetch order summary by Order ID or MongoDB ID.
* `POST /api/seed`: Seed/reset database with initial rich sample products and categories.

### 🛍️ 3. Product Details & Variations
* Interactive image gallery with thumbnail switcher.
* Live stock indicator ("In Stock" with quantity available vs "Out of Stock").
* Dynamic variations selector (Size / Weight / Color).
* Interactive quantity stepper (`-` and `+`).
* Related products recommendations grid.

### 🛒 4. Shopping Cart & Wishlist
* Slide-over right drawer cart accessible from anywhere on the site.
* Persistent cart state saved in `localStorage`.
* Free shipping progress indicator bar (Free delivery over ₹1,000).
* Wishlist page allowing items to be saved and moved directly to cart.

### 💳 5. Checkout & COD Order Placement
* Complete customer shipping form: Full Name, Phone Number, Email, Address, City, State, Pincode.
* Client-side form validation with instant error messages.
* Payment method: **Cash on Delivery (COD)**.
* Automatic Order ID generation (e.g. `ORD-84920`).
* Automatic inventory stock deduction upon successful order placement.
* Complete Order Confirmation page with printable invoice receipt.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 14 (React 18), Tailwind CSS, Lucide React Icons, React Context API |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **API** | REST API Architecture |
| **Version Control** | Git & GitHub |

---

## 📁 Directory Structure

```
Ecomm-site/
├── backend/
│   ├── config/          # Database connection (db.js)
│   ├── controllers/     # API Controllers (product, category, order)
│   ├── data/            # Initial dataset (seedData.js)
│   ├── models/          # Mongoose Schemas (Product, Category, Order)
│   ├── routes/          # Express REST API routes
│   ├── .env             # Backend environment variables
│   ├── seeder.js        # Script to seed database
│   └── server.js        # Entry Express application
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js App Router (pages: /, /shop, /product/[id], /cart, /wishlist, /checkout, /order-confirmation/[id])
│   │   ├── components/  # Reusable UI components (Navbar, Footer, Hero, ProductCard, SearchBar, CartDrawer, etc.)
│   │   ├── context/     # Global state (CartContext, WishlistContext)
│   │   └── services/    # API Service Layer (api.js)
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── .env.local       # Frontend API base URL configuration
├── README.md
└── .gitignore
```

---

## 🔑 Environment Variables Configuration

### Backend (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://vishnusuresh683_db_user:yWcYpQCfr008Ws9F@cluster0.ecgmhow.mongodb.net/ecom_db?retryWrites=true&w=majority
```

### Frontend (`frontend/.env.local` & `frontend/.env.production`):
```env
NEXT_PUBLIC_API_URL=https://ecom-application-1-l82j.onrender.com/api
```

---

## 🌐 Live Hosted Deployment

* **Backend API URL (Render)**: [https://ecom-application-1-l82j.onrender.com/api](https://ecom-application-1-l82j.onrender.com/api)
* **API Health Check**: [https://ecom-application-1-l82j.onrender.com/api/health](https://ecom-application-1-l82j.onrender.com/api/health)
* **GitHub Repository**: [https://github.com/vs0111/ecom-application.git](https://github.com/vs0111/ecom-application.git)

---

## 🚀 Local Installation & Run Instructions

### Step 1: Clone Repository
```bash
git clone https://github.com/vs0111/ecom-application.git
cd ecom-application
```

### Step 2: Set Up & Seed Backend
```bash
cd backend
npm install
npm run seed     # Populate MongoDB database with initial products & categories
npm run dev      # Start Express backend server on http://localhost:5000
```

### Step 3: Set Up & Start Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev      # Start Next.js frontend on http://localhost:3000
```

Open your browser at `http://localhost:3000` to interact with the full application!

---

## 📊 Database Schemas

### Products Collection:
```json
{
  "name": "Zenith Studio Wireless Headphones",
  "slug": "zenith-studio-wireless-headphones",
  "description": "Experience acoustic clarity with active noise cancellation...",
  "price": 12999,
  "discountPrice": 8999,
  "category": "Electronics",
  "images": ["https://images.unsplash.com/..."],
  "variations": [{ "name": "Color", "options": ["Matte Black", "Silver Gray"] }],
  "stock": 25,
  "featured": true,
  "isOffer": true,
  "rating": 4.8,
  "reviewCount": 142
}
```

### Orders Collection:
```json
{
  "orderId": "ORD-84920",
  "customerDetails": {
    "name": "Vishnu Suresh",
    "phone": "9876543210",
    "email": "vishnu@example.com",
    "address": "123 Tech Avenue",
    "city": "Kochi",
    "state": "Kerala",
    "pincode": "682001"
  },
  "products": [...],
  "subtotal": 8999,
  "shippingFee": 0,
  "totalAmount": 8999,
  "paymentMethod": "COD",
  "status": "Pending",
  "createdAt": "2026-10-07T16:00:00.000Z"
}
```

---

## ⚡ Performance & Optimization
* **Lazy Loading**: Images are optimized and loaded lazily.
* **Component Architecture**: Reusable UI components (`ProductCard`, `SearchBar`, `CartDrawer`).
* **Debounced Search**: Search input utilizes a 300ms debounce to prevent excessive backend API queries.
* **Responsive UI**: Fully tested across Mobile, Tablet, and Desktop screens.

---

## 📌 Assumptions & Limitations
* Payment is exclusively handled via Cash on Delivery (COD) as requested in the task specifications.
* Wishlist and Cart data persist locally in browser `localStorage`.
