'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const [added, setAdded] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const isWishlisted = isInWishlist(product._id);

  const discountPercent = product.price > product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden card-shadow card-hover flex flex-col justify-between relative">
      
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Link href={`/product/${product._id}`}>
          <img
            src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 bg-rose-600 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
          {product.featured && (
            <span className="px-2.5 py-1 bg-amber-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg shadow-sm">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md backdrop-blur-md transition ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 dark:bg-slate-800 dark:text-rose-500'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-500 hover:text-rose-500'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-sky-600 dark:text-sky-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1 font-semibold text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating || 4.5}</span>
            </div>
          </div>

          <Link href={`/product/${product._id}`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 transition line-clamp-1 mb-2">
              {product.name}
            </h3>
          </Link>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              ₹{product.discountPrice.toLocaleString()}
            </span>
            {product.price > product.discountPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-2 shadow-sm ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-sky-600 text-white dark:bg-slate-800 dark:hover:bg-sky-600'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
