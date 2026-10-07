'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
  const {
    cartItems,
    cartSubtotal,
    shippingFee,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useCart();

  const freeShippingThreshold = 1000;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-sky-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-sky-600 mx-auto mb-6 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Your Cart is Empty</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto">
          Explore our trending catalog to discover high quality electronics, footwear, and fashion items!
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-sky-600/30 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Start Shopping Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review your order items before proceeding to Cash on Delivery checkout.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline self-start sm:self-auto"
        >
          Clear Shopping Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Free Shipping Alert Banner */}
          <div className="p-4 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 rounded-2xl flex items-center gap-3">
            <Truck className="w-5 h-5 text-sky-600 flex-shrink-0" />
            <div className="text-xs text-sky-900 dark:text-sky-200 font-medium">
              {amountForFreeShipping > 0 ? (
                <>Add <strong>₹{amountForFreeShipping.toLocaleString()}</strong> more to unlock <strong>FREE Delivery</strong>!</>
              ) : (
                <span className="text-emerald-600 font-bold">🎉 Congratulations! You have unlocked FREE Express Shipping!</span>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden card-shadow divide-y divide-slate-100 dark:divide-slate-800">
            {cartItems.map((item) => (
              <div key={item.cartKey} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl bg-slate-100 border border-slate-200 dark:border-slate-800 flex-shrink-0"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <Link
                      href={`/product/${item.productId}`}
                      className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 hover:text-sky-600 transition line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.cartKey)}
                      className="text-slate-400 hover:text-rose-600 transition p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.variation && (
                    <span className="inline-block text-[11px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      Variation: {item.variation}
                    </span>
                  )}

                  <div className="flex items-center gap-2 pt-1 text-xs">
                    <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                      ₹{(item.discountPrice || item.price).toLocaleString()}
                    </span>
                    {item.price > item.discountPrice && (
                      <span className="text-slate-400 line-through text-xs">
                        ₹{item.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 p-1">
                    <button
                      onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                      className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900 dark:text-slate-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                      className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="block text-[10px] text-slate-400 font-semibold uppercase">Total</span>
                    <span className="text-sm font-black text-sky-600">
                      ₹{((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 hover:text-sky-700"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 card-shadow sticky top-24">
            
            <h3 className="text-base font-black text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">₹{cartSubtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping Fee</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="text-emerald-600">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Payment Method</span>
                <span className="font-bold text-sky-600">Cash on Delivery (COD)</span>
              </div>

              <div className="flex justify-between text-sm font-black text-slate-900 dark:text-slate-100 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span>Total Payable Amount</span>
                <span className="text-sky-600 text-base">₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-sky-600/30 transition flex items-center justify-center gap-2"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Safe & Secure Doorstep COD Checkout</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
