'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryGrid({ categories }) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
            Explore Collections
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Shop By Category
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group"
        >
          View All Categories <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat._id || cat.slug}
            href={`/shop?category=${encodeURIComponent(cat.name)}`}
            className="group relative h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md card-hover bg-slate-900 flex flex-col justify-end p-4 text-white"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="relative z-10">
              <h3 className="font-bold text-base sm:text-lg group-hover:text-sky-300 transition">
                {cat.name}
              </h3>
              <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                {cat.description || 'Explore latest collection'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
