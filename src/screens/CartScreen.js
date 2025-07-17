import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../context/CartContext';
import Toast from 'react-native-toast-message';

const CartScreen = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleDecrease = async (productId, quantity) => {
    if (quantity > 1) {
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
      }
    } else {
      Alert.alert('Remove Item', 'Do you want to remove this item?', [
        { text: 'Cancel' },
        {
          text: 'Remove',
          onPress: () => removeFromCart(productId),
        },
      ]);
    }
  };

  const handleIncrease = async (productId, currentQty) => {
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
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.product.image || 'https://via.placeholder.com/150' }}
        style={styles.backgroundImage}
        blurRadius={1}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.cardTop}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <Text style={styles.productPrice}>
            ${item.product.price} x {item.quantity}
          </Text>
        </View>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => handleDecrease(item.product._id, item.quantity)}
          >
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyDisplay}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => handleIncrease(item.product._id, item.quantity)}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() =>
              Alert.alert('Remove Item', 'Are you sure?', [
                { text: 'Cancel' },
                {
                  text: 'Remove',
                  onPress: () => removeFromCart(item.product._id),
                },
              ])
            }
          >
            <Text style={styles.removeText}>REMOVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>

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
              onPress={() => Alert.alert('Checkout', 'Proceeding to checkout...')}
            >
              <Text style={styles.checkoutText}>PROCEED TO CHECKOUT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
              <Text style={styles.clearText}>CLEAR CART</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Toast />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: '#f2f2f2',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  overlay: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: { fontSize: 18, fontWeight: 'bold', flex: 1, marginRight: 10 },
  productPrice: { fontSize: 16, color: '#444' },
  quantityRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  qtyButton: {
    backgroundColor: '#1E90FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
  },
  qtyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  qtyDisplay: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  removeText: { color: '#fff', fontWeight: 'bold' },
  footer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    paddingHorizontal: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkoutBtn: {
    flex: 1,
    backgroundColor: '#1E90FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  clearBtn: {
    flex: 1,
    backgroundColor: '#999',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  clearText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 100,
  },
});
