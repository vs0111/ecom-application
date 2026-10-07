import React from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedProducts from '../components/FeaturedProducts';
import OffersSection from '../components/OffersSection';
import Testimonials from '../components/Testimonials';
import { fetchCategories, fetchFeaturedProducts, fetchOfferProducts } from '../services/api';

export const revalidate = 0; // Fresh data fetch

export default async function HomePage() {
  const [categoriesRes, featuredRes, offersRes] = await Promise.all([
    fetchCategories(),
    fetchFeaturedProducts(),
    fetchOfferProducts()
  ]);

  const categories = categoriesRes.data || [];
  const featuredProducts = featuredRes.data || [];
  const offerProducts = offersRes.data || [];

  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <Hero />

      {/* Product Categories Grid */}
      <CategoryGrid categories={categories} />

      {/* Featured / Best-Selling Products */}
      <FeaturedProducts products={featuredProducts} />

      {/* Offers & Discounts */}
      <OffersSection offerProducts={offerProducts} />

      {/* Customer Testimonials */}
      <Testimonials />
    </div>
  );
}
