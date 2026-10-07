'use client';

import React from 'react';

export default function LoadingSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div className="aspect-square bg-slate-200 dark:bg-slate-800 w-full" />
          <div className="p-4 space-y-3">
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
            <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
