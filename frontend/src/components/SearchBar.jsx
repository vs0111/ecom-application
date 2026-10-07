'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { searchProductsApi } from '../services/api';
import Link from 'next/link';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const res = await searchProductsApi(query);
      if (res.success && res.suggestions) {
        setSuggestions(res.suggestions);
        setIsOpen(true);
      } else {
        setSuggestions([]);
      }
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && suggestions.length > 0 && setIsOpen(true)}
          placeholder="Search products, categories..."
          className="w-full pl-10 pr-10 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-full border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
        <Search className="absolute left-3 w-4 h-4 text-slate-400" />
        {isLoading ? (
          <Loader2 className="absolute right-3 w-4 h-4 text-slate-400 animate-spin" />
        ) : query ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        ) : null}
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 z-50 overflow-hidden max-h-96 overflow-y-auto">
          <div className="p-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Search Suggestions
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {suggestions.map((item) => (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition group"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded-md group-hover:scale-105 transition"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate group-hover:text-sky-600 transition">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500">{item.category}</p>
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  ₹{item.price.toLocaleString()}
                </div>
              </Link>
            ))}
          </div>
          <button
            onClick={handleSearchSubmit}
            className="w-full text-center py-2.5 bg-slate-50 dark:bg-slate-800/80 text-xs font-medium text-sky-600 dark:text-sky-400 hover:bg-slate-100 transition border-t border-slate-100 dark:border-slate-800"
          >
            View all results for &quot;{query}&quot;
          </button>
        </div>
      )}
    </div>
  );
}
