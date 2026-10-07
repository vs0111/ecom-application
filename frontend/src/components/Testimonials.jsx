'use client';

import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Verified Buyer",
    city: "Mumbai, MH",
    rating: 5,
    comment: "The Zenith Studio Headphones arrived within 2 days with Cash on Delivery! Sound quality and active noise cancellation are absolutely top notch. Extremely satisfied with ShopVibe.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Verified Buyer",
    city: "Bengaluru, KA",
    rating: 5,
    comment: "Bought the AeroGlide running sneakers. Perfect fit, super light weight, and the COD payment option gave me 100% peace of mind during checkout. Will order again!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Rohan Varma",
    role: "Verified Buyer",
    city: "Delhi, DL",
    rating: 5,
    comment: "The Nordic Desk Lamp with wireless phone charging is sleek and functional. Premium build quality and super fast response from their support team.",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
          Real Customer Feedback
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
          Loved By 10,000+ Happy Shoppers
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Here is what our verified buyers have to say about our products and seamless COD experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 card-shadow relative flex flex-col justify-between"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-sky-500/10 pointer-events-none" />

            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-6">
                &quot;{item.comment}&quot;
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-sky-500"
              />
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.name}</h4>
                  <CheckCircle className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400">{item.city} • {item.role}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
