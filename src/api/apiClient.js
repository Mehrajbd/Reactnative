import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'https://training-e-commece.vercel.app/api/v1',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const userData = await AsyncStorage.getItem('signedInUser');
    const parsed = JSON.parse(userData);
    const token = parsed?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(' Sending token:', token);
    } else {
      console.warn(' No valid token found!');
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
