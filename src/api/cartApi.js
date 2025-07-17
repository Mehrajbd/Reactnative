import apiClient from './apiClient';
//  Get Cart
export const getCartAPI = async () => {
  try {
    const response = await apiClient.get('/cart');
    console.log(' Cart fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error(' Fetch Cart Error:', error.response?.data || error.message);
    throw error;
  }
};

//  Add to Cart
export const addToCartApi = async (productId, quantity) => {
  try {
    const response = await apiClient.post('/cart', { productId, quantity });
    console.log(' Added to cart:', response.data);
    return response.data;
  } catch (error) {
    console.error(' Add to Cart Error:', error.response?.data || error.message);
    throw error;
  }
};

//  Update Cart Item
export const updateCartItemApi = async (productId, quantity) => {
  try {
    const response = await apiClient.patch(`/cart/${productId}`, { quantity });
    console.log(' Cart item updated:', response.data);
    return response.data;
  } catch (error) {
    console.error(' Update Cart Item Error:', error.response?.data || error.message);
    throw error;
  }
};

//  Delete Cart Item
export const deleteCartItemApi = async (productId) => {
  try {
    const response = await apiClient.delete(`/cart/${productId}`);
    console.log(' Cart item deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error(' Delete Cart Item Error:', error.response?.data || error.message);
    throw error;
  }
};
