'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Headset, Github, Twitter, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      {/* Value Proposition Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Free Express Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">On all orders above ₹1,000</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Cash on Delivery</h4>
              <p className="text-xs text-slate-400 mt-0.5">Pay safely at your doorstep</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Easy 7-Day Returns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Hassle-free replacement policy</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">24/7 Dedicated Support</h4>
              <p className="text-xs text-slate-400 mt-0.5">Friendly customer service</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              ShopVibe
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            ShopVibe is your premier e-commerce destination for high quality tech, modern apparel, footwear, and home accessories. Designed for comfort, built for performance.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://github.com/vs0111/ecom-application" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-600 hover:text-white text-slate-400 flex items-center justify-center transition">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-600 hover:text-white text-slate-400 flex items-center justify-center transition">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-600 hover:text-white text-slate-400 flex items-center justify-center transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-600 hover:text-white text-slate-400 flex items-center justify-center transition">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/" className="hover:text-sky-400 transition">Home</Link></li>
            <li><Link href="/shop" className="hover:text-sky-400 transition">All Products</Link></li>
            <li><Link href="/shop?featured=true" className="hover:text-sky-400 transition">Featured Items</Link></li>
            <li><Link href="/shop?category=Offers" className="hover:text-sky-400 transition">Deals & Offers</Link></li>
            <li><Link href="/wishlist" className="hover:text-sky-400 transition">My Wishlist</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/shop?category=Electronics" className="hover:text-sky-400 transition">Electronics</Link></li>
            <li><Link href="/shop?category=Fashion" className="hover:text-sky-400 transition">Fashion</Link></li>
            <li><Link href="/shop?category=Footwear" className="hover:text-sky-400 transition">Footwear</Link></li>
            <li><Link href="/shop?category=Home %26 Living" className="hover:text-sky-400 transition">Home & Living</Link></li>
            <li><Link href="/shop?category=Accessories" className="hover:text-sky-400 transition">Accessories</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Info</h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
              <span>Tech Park Hub, MG Road, Bengaluru, India</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>support@shopvibe.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} ShopVibe E-Commerce App. Built with Next.js & Node.js REST API.</p>
        <div className="flex items-center gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>COD Policy</span>
        </div>
      </div>
    </footer>
  );
}
