'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { fetchProducts, fetchCategories } from '../../services/api';
import { Filter, SlidersHorizontal, RotateCcw, Search, X } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || searchParams.get('q') || '';
  const initialFeatured = searchParams.get('featured') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortOption, setSortOption] = useState('newest');
  const [isFeaturedOnly, setIsFeaturedOnly] = useState(initialFeatured === 'true');

  // Load categories
  useEffect(() => {
    fetchCategories().then((res) => {
      if (res.success) setCategories(res.data);
    });
  }, []);

  // Fetch products whenever filters change
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const params = {};
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedCategory === 'Offers') {
        params.isOffer = 'true';
      } else {
        params.category = selectedCategory;
      }
    }
    if (searchQuery.trim()) params.search = searchQuery.trim();
    if (priceRange.min) params.minPrice = priceRange.min;
    if (priceRange.max) params.maxPrice = priceRange.max;
    if (sortOption) params.sort = sortOption;
    if (isFeaturedOnly) params.featured = 'true';

    fetchProducts(params).then((res) => {
      if (isMounted) {
        if (res.success) {
          setProducts(res.data || []);
        } else {
          setProducts([]);
        }
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery, priceRange, sortOption, isFeaturedOnly]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange({ min: '', max: '' });
    setSortOption('newest');
    setIsFeaturedOnly(false);
    router.push('/shop');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Title */}
      <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Browse All Products
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Showing {products.length} {products.length === 1 ? 'item' : 'items'} available for delivery
          </p>
        </div>

        {/* Sorting & Search */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in list..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="newest">Sort by: Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Popularity & Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 card-shadow">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
                <Filter className="w-4 h-4 text-sky-600" /> Filters
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-sky-600 hover:text-sky-700 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Categories
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition ${
                    selectedCategory === 'all'
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition flex justify-between items-center ${
                      selectedCategory === cat.name
                        ? 'bg-sky-600 text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
                <button
                  onClick={() => setSelectedCategory('Offers')}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition ${
                    selectedCategory === 'Offers'
                      ? 'bg-amber-500 text-white'
                      : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                  }`}
                >
                  🔥 Deals & Offers
                </button>
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Price Range (₹)
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                  className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                  className="w-full p-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>
            </div>

            {/* Featured Only Checkbox */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={isFeaturedOnly}
                  onChange={(e) => setIsFeaturedOnly(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
                />
                Featured Products Only
              </label>
            </div>

          </div>
        </div>

        {/* Product Grid / Loading / Empty State */}
        <div className="lg:col-span-9">
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : products.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 card-shadow">
              <div className="w-16 h-16 bg-sky-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-sky-500 mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No products matched your criteria</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try adjusting your price range, clearing your search query, or selecting another category.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 px-6 py-2.5 bg-sky-600 text-white font-semibold text-xs rounded-xl shadow hover:bg-sky-700 transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12"><LoadingSkeleton count={6} /></div>}>
      <ShopContent />
    </Suspense>
  );
}
