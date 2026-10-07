'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchProductById } from '../../../services/api';
import ProductCard from '../../../components/ProductCard';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  ChevronRight,
  PackageCheck,
  Clock
} from 'lucide-react';

export default function ProductDetailPage({ params }) {
  const { id } = params;

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariation, setSelectedVariation] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchProductById(id).then((res) => {
      if (!isMounted) return;
      if (res.success && res.data) {
        setProduct(res.data);
        setRelated(res.related || []);
        if (res.data.images && res.data.images.length > 0) {
          setSelectedImage(res.data.images[0]);
        }
        if (res.data.variations && res.data.variations.length > 0) {
          const firstVar = res.data.variations[0];
          if (firstVar.options && firstVar.options.length > 0) {
            setSelectedVariation(`${firstVar.name}: ${firstVar.options[0]}`);
          }
        }
      } else {
        setError(res.error || 'Product not found');
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-500">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          !
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Product Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested product ID &quot;{id}&quot; does not exist or has been removed.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 text-white font-semibold text-xs rounded-xl shadow hover:bg-sky-700 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product._id);
  const discountPercent = product.price > product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariation);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <Link href="/" className="hover:text-sky-600 transition">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-sky-600 transition">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-sky-600 transition">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 dark:text-slate-200 line-clamp-1">{product.name}</span>
      </nav>

      {/* Main Product Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-xl shadow">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail Selector */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition flex-shrink-0 ${
                    selectedImage === imgUrl
                      ? 'border-sky-600 scale-95 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-sky-600 mb-1">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {product.name}
            </h1>

            {/* Rating & Stock Badge */}
            <div className="flex items-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-500">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating || 4.5) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span>{product.rating || 4.5}</span>
                <span className="text-slate-400">({product.reviewCount || 24} reviews)</span>
              </div>

              <span className="text-slate-300">|</span>

              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900">
                  <PackageCheck className="w-3.5 h-3.5" /> In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-rose-600 font-bold bg-rose-50 px-2.5 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-slate-100 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
              ₹{product.discountPrice.toLocaleString()}
            </span>
            {product.price > product.discountPrice && (
              <span className="text-sm font-semibold text-slate-400 line-through">
                ₹{product.price.toLocaleString()}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 ml-auto">
              Inclusive of all taxes
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Variations Selector */}
          {product.variations && product.variations.length > 0 && (
            <div className="space-y-3 pt-2">
              {product.variations.map((vGroup, idx) => (
                <div key={idx}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Select {vGroup.name}:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {vGroup.options.map((opt) => {
                      const varVal = `${vGroup.name}: ${opt}`;
                      const isSelected = selectedVariation === varVal;
                      return (
                        <button
                          key={opt}
                          onClick={() => setSelectedVariation(varVal)}
                          className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
                            isSelected
                              ? 'bg-sky-600 text-white border-sky-600 shadow'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-500'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quantity:
              </label>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`sm:col-span-9 py-3.5 px-6 rounded-2xl font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2 ${
                  product.stock <= 0
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-sky-600 hover:bg-sky-500 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" /> Added {quantity} item(s) to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Add to Shopping Cart
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`sm:col-span-3 py-3.5 px-4 rounded-2xl font-bold text-xs border transition flex items-center justify-center gap-1.5 ${
                  isWishlisted
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 border-rose-200 dark:border-rose-900'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>
          </div>

          {/* Delivery & Trust Highlights */}
          <div className="grid grid-cols-2 gap-3 pt-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-900">
              <Truck className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>Cash on Delivery Available</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>7-Day Return Guarantee</span>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Related Products You Might Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
