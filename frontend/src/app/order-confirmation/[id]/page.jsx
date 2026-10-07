'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchOrderById } from '../../../services/api';
import { CheckCircle, ShoppingBag, MapPin, Phone, Mail, ArrowRight, Printer } from 'lucide-react';

export default function OrderConfirmationPage({ params }) {
  const id = params?.id;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetchOrderById(id).then((res) => {
      if (res.success && res.data) {
        setOrder(res.data);
      } else {
        setError(res.message || 'Order not found');
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs font-semibold text-slate-500">Loading order receipt details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Order Summary</h2>
        <p className="text-xs text-slate-500">{error || 'Please check your order ID or place an order.'}</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 text-white font-bold text-xs rounded-xl shadow"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const { orderId, customerDetails, products, totalAmount, paymentMethod, status, createdAt } = order;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-sky-600 text-white p-8 rounded-3xl shadow-xl text-center space-y-3">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-black tracking-tight">Order Placed Successfully!</h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-md mx-auto">
          Thank you for shopping with ShopVibe! Your Cash on Delivery order is confirmed and currently being packed.
        </p>
        <div className="inline-block px-4 py-1.5 bg-black/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase">
          Order ID: <span className="text-amber-300">{orderId}</span>
        </div>
      </div>

      {/* Main Receipt Details Card */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 card-shadow space-y-6">
        
        {/* Meta Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl text-xs">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Date Placed</span>
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {new Date(createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Payment Method</span>
            <span className="font-bold text-sky-600">{paymentMethod}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Order Status</span>
            <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-[10px]">
              {status}
            </span>
          </div>
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Total Amount</span>
            <span className="font-black text-slate-900 dark:text-slate-100 text-sm">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Customer & Address Details */}
        {customerDetails && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-600" /> Shipping & Customer Details
            </h3>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
              <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{customerDetails.name}</p>
              <p>{customerDetails.address}, {customerDetails.city}, {customerDetails.state} - {customerDetails.pincode}</p>
              <div className="flex flex-wrap gap-4 pt-1 text-slate-500 font-medium">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-sky-600" /> {customerDetails.phone}</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-sky-600" /> {customerDetails.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* Ordered Items Table */}
        {products && products.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-sky-600" /> Items Ordered ({products.length})
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
              {products.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center gap-4 bg-white dark:bg-slate-900">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl bg-slate-100" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{item.name}</h4>
                    {item.variation && <span className="text-[10px] text-slate-400">Var: {item.variation}</span>}
                    <p className="text-[11px] text-slate-500 mt-0.5">Quantity: {item.quantity} × ₹{(item.discountPrice || item.price).toLocaleString()}</p>
                  </div>
                  <div className="text-xs font-black text-slate-900 dark:text-slate-100">
                    ₹{((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-50 transition flex items-center justify-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print Invoice
          </button>
          
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-1.5"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
