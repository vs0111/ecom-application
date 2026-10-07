'use client';

import React from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedProducts({ products }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Curated Collection
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Featured & Best-Selling Products
          </h2>
        </div>
        <Link
          href="/shop?featured=true"
          className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
        >
          View All Featured <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
