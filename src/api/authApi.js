
import apiClient from './apiClient'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

//  Register
export const registerUser = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

//  Login
export const loginUser = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  console.log('Raw Login Response:', response.data);
  return response.data;
};

//  Logout
export const logoutUser = async () => {
  try {
    const response = await apiClient.post('/auth/logout'); 
    await AsyncStorage.removeItem('signedInUser');
    console.log(' Logged out:', response.data);
    return response.data;
  } catch (error) {
    console.error(' Logout error:', error.response?.data || error.message);
    throw error;
  }
};
