import apiClient from './apiClient';
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data.data; 
  } catch (error) {
    console.error(' Product fetch error:', error.response?.data || error.message);
    throw error;
  }
};
