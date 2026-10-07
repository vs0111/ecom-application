const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ecom-application-1-l82j.onrender.com/api';

export const fetchProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/products?${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (error) {
    console.error('API Error fetchProducts:', error);
    return { success: false, data: [], error: error.message };
  }
};

export const fetchProductById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Product not found');
    return await res.json();
  } catch (error) {
    console.error('API Error fetchProductById:', error);
    return { success: false, data: null, error: error.message };
  }
};

export const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (error) {
    console.error('API Error fetchCategories:', error);
    return { success: false, data: [] };
  }
};

export const fetchFeaturedProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products/featured`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch featured products');
    return await res.json();
  } catch (error) {
    console.error('API Error fetchFeaturedProducts:', error);
    return { success: false, data: [] };
  }
};

export const fetchOfferProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products/offers`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch offer products');
    return await res.json();
  } catch (error) {
    console.error('API Error fetchOfferProducts:', error);
    return { success: false, data: [] };
  }
};

export const searchProductsApi = async (query) => {
  try {
    const res = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Search failed');
    return await res.json();
  } catch (error) {
    console.error('API Error searchProductsApi:', error);
    return { success: false, data: [], suggestions: [] };
  }
};

export const createOrderApi = async (orderData) => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create order');
    return data;
  } catch (error) {
    console.error('API Error createOrderApi:', error);
    return { success: false, message: error.message };
  }
};

export const fetchOrderById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/orders/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Order not found');
    return await res.json();
  } catch (error) {
    console.error('API Error fetchOrderById:', error);
    return { success: false, data: null, message: error.message };
  }
};
