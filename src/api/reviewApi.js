
import apiClient from './apiClient';

export const postReview = (payload) => apiClient.post('/reviews', payload);
export const getProductReview = (productId) => apiClient.get(`/reviews/product/${productId}`);
export const updateReview = (reviewId, data) => apiClient.patch(`/reviews/${reviewId}`, data);
export const deleteReview = (reviewId) => apiClient.delete(`/reviews/${reviewId}`);
