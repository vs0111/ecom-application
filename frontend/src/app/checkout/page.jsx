'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { createOrderApi } from '../../services/api';
import { ShieldCheck, Truck, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartSubtotal, shippingFee, cartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">No Items to Checkout</h1>
        <p className="text-xs text-slate-500 mt-2">Your shopping cart is empty. Add products before checking out.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-sky-600 text-white font-bold text-xs rounded-xl shadow"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Shop
        </Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone Number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) errs.address = 'Delivery Street Address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State is required';
    if (!formData.pincode.trim()) {
      errs.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = 'Enter a valid 6-digit Pincode';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setSubmitting(true);

    const orderPayload = {
      customerDetails: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim()
      },
      products: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        discountPrice: item.discountPrice,
        variation: item.variation,
        quantity: item.quantity,
        image: item.image
      })),
      paymentMethod: 'COD'
    };

    const response = await createOrderApi(orderPayload);

    if (response.success && response.data) {
      clearCart();
      router.push(`/order-confirmation/${response.data.orderId || response.data._id}`);
    } else {
      setApiError(response.message || 'Failed to place order. Please check your details and try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Checkout & Shipping
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete your delivery information below for Cash on Delivery order processing.
        </p>
      </div>

      {apiError && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-3 text-xs font-semibold">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Customer Details Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 card-shadow space-y-5">
            
            <h2 className="text-base font-black text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
              1. Customer & Shipping Details
            </h2>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Vishnu Suresh"
                className={`w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-sky-500'
                }`}
              />
              {errors.name && <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.name}</p>}
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Phone Number *
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className={`w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.phone ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-sky-500'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. vishnu@example.com"
                  className={`w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-sky-500'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.email}</p>}
              </div>
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Street Address *
              </label>
              <textarea
                name="address"
                rows="2"
                value={formData.address}
                onChange={handleChange}
                placeholder="House / Flat No., Building Name, Street, Landmark"
                className={`w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.address ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-sky-500'
                }`}
              />
              {errors.address && <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.address}</p>}
            </div>

            {/* City, State & Pincode */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Kochi"
                  className={`w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.city ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-sky-500'
                  }`}
                />
                {errors.city && <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. Kerala"
                  className={`w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.state ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-sky-500'
                  }`}
                />
                {errors.state && <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="e.g. 682001"
                  className={`w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl focus:outline-none focus:ring-2 ${
                    errors.pincode ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-slate-700 focus:ring-sky-500'
                  }`}
                />
                {errors.pincode && <p className="text-[11px] text-rose-500 mt-1 font-semibold">{errors.pincode}</p>}
              </div>
            </div>

          </div>

          {/* Payment Method Section */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 card-shadow space-y-4">
            <h2 className="text-base font-black text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
              2. Payment Method Selection
            </h2>

            <div className="p-4 bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-600 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-4 border-sky-600 bg-white" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Cash on Delivery (COD)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Pay with cash or UPI directly to the delivery executive at your doorstep.
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                REQUIRED BY TASK
              </span>
            </div>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 card-shadow space-y-6 sticky top-24">
            
            <h3 className="text-base font-black text-slate-900 dark:text-slate-100 pb-3 border-b border-slate-100 dark:border-slate-800">
              Items in Your Order
            </h3>

            <div className="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-slate-100 dark:divide-slate-800">
              {cartItems.map((item) => (
                <div key={item.cartKey} className="pt-3 first:pt-0 flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-xl bg-slate-100" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">Qty: {item.quantity} {item.variation ? `• ${item.variation}` : ''}</p>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                    ₹{((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">₹{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total Amount to Pay</span>
                <span className="text-sky-600">₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-sky-600/30 transition flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Placing Order...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Place Order (Cash on Delivery)
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-semibold">
              <Truck className="w-4 h-4 text-sky-500" /> Guaranteed 3-5 Day Doorstep Delivery
            </div>

          </div>
        </div>

      </form>
    </div>
  );
}
