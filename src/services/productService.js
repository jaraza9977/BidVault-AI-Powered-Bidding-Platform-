import api from './api';

export const productService = {
  getAllProducts: async (limit = 20) => {
    try {
      const response = await api.get(`/products?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products' };
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch product' };
    }
  },

  getCategories: async () => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch categories' };
    }
  },

  getProductsByCategory: async (category) => {
    try {
      const response = await api.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products by category' };
    }
  },

  searchProducts: async (query) => {
    try {
      // FakeStoreAPI doesn't have search, so we'll filter client-side
      const response = await api.get('/products');
      const products = response.data;
      return products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search products' };
    }
  },
};
