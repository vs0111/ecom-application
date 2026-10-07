'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Heart, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product._id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/40 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-6 shadow-sm">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Your Wishlist is Empty
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto">
          Save your favorite products to your wishlist so you can buy them anytime later!
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-sky-600/30 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          My Saved Wishlist ({wishlistItems.length})
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Items added to your personal wishlist stay saved in your browser session.
        </p>
      </div>

      {/* Wishlist Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden card-shadow flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800">
              <Link href={`/product/${product._id}`}>
                <img
                  src={product.images && product.images[0] ? product.images[0] : ''}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </Link>
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-slate-900/90 text-rose-500 hover:bg-rose-50 rounded-full shadow transition"
                title="Remove from Wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                  {product.category}
                </span>
                <Link href={`/product/${product._id}`}>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-sky-600 transition line-clamp-1 mt-0.5">
                    {product.name}
                  </h3>
                </Link>
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    ₹{product.discountPrice.toLocaleString()}
                  </span>
                  {product.price > product.discountPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleMoveToCart(product)}
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
