const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Cutting-edge gadgets, audio gear, and personal devices."
  },
  {
    name: "Fashion",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
    description: "Modern apparel, coats, streetwear, and designer outfits."
  },
  {
    name: "Footwear",
    slug: "footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description: "Premium sneakers, athletic running shoes, and boots."
  },
  {
    name: "Home & Living",
    slug: "home-living",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    description: "Minimalist home decor, lighting, and workspace setup."
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "Luxury watches, sunglasses, bags, and leather goods."
  }
];

const products = [
  {
    name: "Zenith Studio Wireless Headphones",
    slug: "zenith-studio-wireless-headphones",
    description: "Experience acoustic clarity with active noise cancellation, 40-hour battery life, and ultra-soft memory foam earcups.",
    price: 12999,
    discountPrice: 8999,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80"
    ],
    variations: [
      { name: "Color", options: ["Matte Black", "Silver Gray", "Midnight Blue"] }
    ],
    stock: 25,
    featured: true,
    isOffer: true,
    rating: 4.8,
    reviewCount: 142
  },
  {
    name: "Pulse Smart Watch Series 5",
    slug: "pulse-smart-watch-series-5",
    description: "Track your health metrics, ECG, sleep cycles, and daily workouts on a crystal-clear AMOLED display with water resistance up to 50m.",
    price: 15999,
    discountPrice: 11499,
    category: "Electronics",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80"
    ],
    variations: [
      { name: "Band Size", options: ["40mm", "44mm"] },
      { name: "Strap Color", options: ["Space Gray", "Starlight", "Rose Gold"] }
    ],
    stock: 18,
    featured: true,
    isOffer: false,
    rating: 4.7,
    reviewCount: 89
  },
  {
    name: "AeroGlide Ultralight Running Sneakers",
    slug: "aeroglide-ultralight-running-sneakers",
    description: "Engineered responsive foam midsole with breathable mesh upper designed for marathon comfort and maximum speed.",
    price: 7999,
    discountPrice: 4999,
    category: "Footwear",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80"
    ],
    variations: [
      { name: "Size (UK)", options: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"] },
      { name: "Colorway", options: ["Crimson Red", "Triple Black", "Electric White"] }
    ],
    stock: 30,
    featured: true,
    isOffer: true,
    rating: 4.9,
    reviewCount: 215
  },
  {
    name: "Urban Explorer Canvas & Leather Backpack",
    slug: "urban-explorer-canvas-leather-backpack",
    description: "Handcrafted water-resistant canvas laptop bag with full-grain leather trim and anti-theft back pocket.",
    price: 4599,
    discountPrice: 3299,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80"
    ],
    variations: [
      { name: "Color", options: ["Olive Green", "Charcoal Gray", "Tan Brown"] }
    ],
    stock: 12,
    featured: false,
    isOffer: true,
    rating: 4.6,
    reviewCount: 64
  },
  {
    name: "Nordic Minimalist Desk Lamp",
    slug: "nordic-minimalist-desk-lamp",
    description: "Adjustable warm LED desk light with wireless smartphone charging pad integrated into the solid wooden base.",
    price: 3499,
    discountPrice: 2499,
    category: "Home & Living",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80"
    ],
    variations: [
      { name: "Finish", options: ["Natural Oak", "Walnut Black"] }
    ],
    stock: 15,
    featured: true,
    isOffer: true,
    rating: 4.5,
    reviewCount: 48
  },
  {
    name: "Over-Sized Vintage Denim Jacket",
    slug: "over-sized-vintage-denim-jacket",
    description: "100% heavy cotton denim with custom distress detailing, classic brass buttons, and relaxed street fit.",
    price: 4999,
    discountPrice: 3499,
    category: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1000&q=80"
    ],
    variations: [
      { name: "Size", options: ["S", "M", "L", "XL"] },
      { name: "Wash", options: ["Washed Light Blue", "Raw Indigo"] }
    ],
    stock: 22,
    featured: false,
    isOffer: false,
    rating: 4.7,
    reviewCount: 92
  },
  {
    name: "Classic Aviator Polarized Sunglasses",
    slug: "classic-aviator-polarized-sunglasses",
    description: "Lightweight titanium frame with UV400 anti-glare polarized lenses for driving and outdoors.",
    price: 2999,
    discountPrice: 1999,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80"
    ],
    variations: [
      { name: "Frame Color", options: ["Gold", "Matte Silver", "Gunmetal Black"] }
    ],
    stock: 40,
    featured: true,
    isOffer: true,
    rating: 4.8,
    reviewCount: 173
  },
  {
    name: "Ergonomic Ceramic Coffee Mug Set",
    slug: "ergonomic-ceramic-coffee-mug-set",
    description: "Set of 2 handcrafted stoneware mugs with heat retention ceramic finish and matte wooden coasters.",
    price: 1899,
    discountPrice: 1299,
    category: "Home & Living",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1000&q=80"
    ],
    variations: [
      { name: "Color Set", options: ["Slate Gray & Cream", "Terracotta & Olive"] }
    ],
    stock: 35,
    featured: false,
    isOffer: true,
    rating: 4.6,
    reviewCount: 39
  }
];

module.exports = { categories, products };
