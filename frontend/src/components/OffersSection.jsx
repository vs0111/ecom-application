'use client';

import React from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { Tag, Flame, Clock } from 'lucide-react';

export default function OffersSection({ offerProducts }) {
  if (!offerProducts || offerProducts.length === 0) return null;

  return (
    <section className="py-12 bg-gradient-to-b from-amber-500/5 via-sky-500/5 to-transparent my-8 border-y border-amber-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-sky-600 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest">
              <Flame className="w-4 h-4 text-amber-300 fill-amber-300" /> Limited Time Deals
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Mega Deals & Discount Offers
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 max-w-lg">
              Save up to 40% OFF on selected footwear, audio gear, and fashion items. Valid while stocks last!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/10">
            <Clock className="w-5 h-5 text-amber-300 animate-pulse" />
            <div className="text-left">
              <span className="block text-[10px] uppercase tracking-wider text-amber-200 font-semibold">Offer Ends In</span>
              <span className="text-base font-black text-white tracking-widest">24h : 18m : 42s</span>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {offerProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
