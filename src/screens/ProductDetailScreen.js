import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useCart } from '../context/CartContext';
import Toast from 'react-native-toast-message';
const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false); 

const handleAddToCart = async () => {
  if (loading) return;
  try {
    setLoading(true);
    if (!product?._id) throw new Error('Invalid product ID');
    await addToCart(product._id, 1);
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Product added to cart ',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Could not add to cart ',
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.usdPrice}>${product.price}</Text>
        <Text style={styles.bdPrice}>
          ৳ {product.discountedPrice || 'N/A'}{' '}
          <Text style={styles.oldPrice}>৳ {product.originalPrice || 'N/A'}</Text>
        </Text>

        <Text style={styles.sectionTitle}>Key Features:</Text>
        <Text style={styles.description}>
          {product.description || 'No description available.'}
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.info}>
            <Text style={styles.label}>Product Code:</Text> {product.code || '40107'}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Brand:</Text> {product.brand || 'Apple'}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Model:</Text> {product.model || 'MacBook Air (2022)'}
          </Text>
          <Text style={styles.info}>
            <Text style={styles.label}>Status:</Text> In Stock
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleAddToCart}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>ADD TO CART</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#F2F2F2' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 230,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  usdPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: 'green',
    marginBottom: 4,
  },
  bdPrice: {
    fontSize: 18,
    marginBottom: 12,
    color: '#444',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    lineHeight: 22,
  },
  infoBox: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginBottom: 20,
  },
  info: {
    fontSize: 15,
    marginBottom: 6,
    color: '#444',
  },
  label: {
    fontWeight: '600',
    color: '#111',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductDetailScreen;
