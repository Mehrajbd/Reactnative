import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import Toast from 'react-native-toast-message';
import { createOrder } from '../api/orderApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CartItemCard from '../components/Cart/CartItemCard';
import CheckoutModal from '../components/Cart/CheckoutModal';

const CartScreen = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [removingProductId, setRemovingProductId] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const getTotalPrice = () =>
    cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

  const handleDecrease = async (productId, quantity) => {
    if (quantity > 1) {
      setLoadingProductId(productId);
      try {
        await updateQuantity(productId, quantity - 1);
        Toast.show({
          type: 'info',
          text1: 'Your Cart Is Updated',
          text2: `Now: ${quantity - 1}`,
        });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Failed to update quantity',
          text2:
            error?.response?.data?.message ||
            error?.message ||
            'Insufficient stock available',
        });
      } finally {
        setLoadingProductId(null);
      }
    } else {
      handleRemove(productId);
    }
  };

  const handleIncrease = async (productId, currentQty) => {
    setLoadingProductId(productId);
    try {
      await updateQuantity(productId, currentQty + 1);
      Toast.show({
        type: 'success',
        text1: 'Your Cart Is Updated',
        text2: `Now: ${currentQty + 1}`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to update quantity',
        text2:
          error?.response?.data?.message ||
          error?.message ||
          'Insufficient stock available',
      });
    } finally {
      setLoadingProductId(null);
    }
  };

  const handleRemove = async (productId) => {
    setRemovingProductId(productId);
    await removeFromCart(productId);
    setRemovingProductId(null);
  };

  const handlePlaceOrder = async () => {
    if (!shippingAddress.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Shipping address is required',
      });
      return;
    }

    setPlacingOrder(true);
    try {
      const payload = {
        shippingAddress: shippingAddress.trim(),
        paymentMethod,
      };

      const orderRes = await createOrder(payload);

      const orderedItems = cartItems.map(item => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));
      const newOrder = {
        items: orderedItems,
        date: new Date().toISOString(),
      };

      const existingHistory = await AsyncStorage.getItem('orderHistory');
      const parsedHistory = existingHistory ? JSON.parse(existingHistory) : [];
      parsedHistory.push(newOrder);
      await AsyncStorage.setItem('orderHistory', JSON.stringify(parsedHistory));

      clearCart();
      setShowModal(false);
      setShippingAddress('');

      Toast.show({
        type: 'success',
        text1: 'Order Placed Successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Failed to place order',
        text2: error?.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setPlacingOrder(false);
    }
  };

  const renderItem = ({ item }) => (
    <CartItemCard
      item={item} loadingProductId={loadingProductId} removingProductId={removingProductId}  onIncrease={handleIncrease}  onDecrease={handleDecrease}  onRemove={handleRemove}
 />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 140, paddingTop: 4 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty</Text>}
      />

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>
            Total: ${getTotalPrice().toFixed(2)}
          </Text>
          <View style={styles.footerButtons}>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => setShowModal(true)}
              disabled={placingOrder}
            >
              <Text style={styles.checkoutText}>
                {placingOrder ? 'PLACING ORDER...' : 'PROCEED TO CHECKOUT'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
              <Text style={styles.clearText}>CLEAR CART</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <CheckoutModal
        visible={showModal}  onClose={() => setShowModal(false)}  shippingAddress={shippingAddress}  setShippingAddress={setShippingAddress}  paymentMethod={paymentMethod}  setPaymentMethod={setPaymentMethod}  placingOrder={placingOrder}  onConfirm={handlePlaceOrder}
      />

      <Toast />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: 'gray',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'right',
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkoutBtn: {
    backgroundColor: '#2e86de',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
  },
  checkoutText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clearBtn: {
    backgroundColor: '#999',
    padding: 12,
    borderRadius: 5,
    flex: 1,
  },
  clearText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
