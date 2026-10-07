'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white py-16 lg:py-24 rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6 shadow-2xl">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Next-Gen E-Commerce Experience</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
            Upgrade Your Lifestyle With <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-amber-300 bg-clip-text text-transparent">Premium Products</span>.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Discover curated electronics, modern street fashion, ultralight footwear, and minimalist home decor with unbeatable Cash on Delivery offers & free delivery.
          </p>

          {/* Highlights & CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/shop"
              className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-slate-900 font-extrabold text-sm rounded-2xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:scale-105 transition flex items-center gap-2"
            >
              Shop Collection Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop?category=Offers"
              className="px-6 py-4 bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-sm rounded-2xl border border-slate-700 backdrop-blur-md transition"
            >
              View Special Offers
            </Link>
          </div>

          {/* Key Badges */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="font-medium text-slate-300">100% Authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span className="font-medium text-slate-300">Fast COD Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-sky-400 flex-shrink-0" />
              <span className="font-medium text-slate-300">4.9/5 Rating</span>
            </div>
          </div>
        </div>

        {/* Right Highlight Showcase Card */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-sm bg-slate-800/80 border border-slate-700/80 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                alt="Zenith Studio Wireless Headphones"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-lg">
                30% OFF
              </span>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                  Featured Product
                </span>
                <h3 className="text-base font-bold text-white">
                  Zenith Studio Headphones
                </h3>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-emerald-400">₹8,999</span>
                <span className="block text-xs text-slate-400 line-through">₹12,999</span>
              </div>
            </div>

            <Link
              href="/product/zenith-studio-wireless-headphones"
              className="block w-full text-center py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 font-bold text-xs rounded-xl shadow transition"
            >
              Buy Now with COD
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
