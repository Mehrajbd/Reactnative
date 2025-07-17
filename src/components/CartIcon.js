
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const navigation = useNavigation();
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <View style={styles.container}>
        <Ionicons name="cart-outline" size={28} color="#000" />
        {totalQuantity > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalQuantity}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CartIcon;

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
