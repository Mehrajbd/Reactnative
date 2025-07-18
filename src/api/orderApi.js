import apiClient from './apiClient';

export const createOrder = async (orderData) => {
  return await apiClient.post('/orders', orderData);
};

export const getOrderHistory = async () => {
  return await apiClient.get('/orders/history');
};

export const updateOrderStatus = async (orderId, status) => {
  return await apiClient.patch(`/orders/${orderId}`, { status });
};
