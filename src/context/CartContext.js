import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCartAPI,
  addToCartApi,
  updateCartItemApi,
  deleteCartItemApi,
} from '../api/cartApi';
import { Alert } from 'react-native';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      console.log('Fetching cart...');
      const res = await getCartAPI();
      console.log('Cart fetch response:', res);
      setCartItems(res?.data?.items || []);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      if (err.response?.status === 401) {
        Alert.alert('Session Expired', 'Please log in again.');
        setCartItems([]);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    if (!productId) {
      throw new Error('Missing product ID');
    }

    try {
      console.log('Adding to cart:', { productId, quantity });
      await addToCartApi(productId, quantity);
      await fetchCart();
    } catch (err) {
      console.error('Add to cart failed:', err);
      throw err;
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (!productId) {
      throw new Error('Missing product ID');
    }

    try {
      console.log('Updating quantity:', { productId, newQuantity });
      await updateCartItemApi(productId, newQuantity);
      await fetchCart();
    } catch (err) {
      console.error('Update quantity failed:', err);
      throw err; 
    }
  };

  const removeFromCart = async (productId) => {
    if (!productId) {
      throw new Error('Missing product ID');
    }

    try {
      console.log('Removing item:', productId);
      await deleteCartItemApi(productId);
      await fetchCart();
    } catch (err) {
      console.error('Remove item failed:', err);
      throw err;
    }
  };

  const clearCart = () => {
    console.log('🧹 Clearing cart...');
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
