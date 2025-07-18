import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

const ProductInfoCard = ({ product, loading, onAddToCart }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.usdPrice}>${product.price}</Text>
      <Text style={styles.bdPrice}>
        ৳ {product.discountedPrice || 'N/A'}{' '}
        <Text style={styles.oldPrice}>৳ {product.originalPrice || 'N/A'}</Text>
      </Text>

      <Text style={styles.sectionTitle}>Key Features:</Text>
      <Text style={styles.description}>{product.description || 'No description available.'}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.info}><Text style={styles.label}>Product Code:</Text> {product.code || '40107'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Brand:</Text> {product.brand || 'Apple'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Model:</Text> {product.model || 'MacBook Air (2022)'}</Text>
        <Text style={styles.info}><Text style={styles.label}>Status:</Text> In Stock</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={onAddToCart}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>ADD TO CART</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  image: { width: '100%', height: 230, borderRadius: 12, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: '700', marginBottom: 8, color: '#333' },
  usdPrice: { fontSize: 20, fontWeight: '600', color: 'green', marginBottom: 4 },
  bdPrice: { fontSize: 18, marginBottom: 12, color: '#444' },
  oldPrice: { textDecorationLine: 'line-through', color: '#999', fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 10, marginBottom: 6, color: '#333' },
  description: { fontSize: 16, color: '#555', marginBottom: 16, lineHeight: 22 },
  infoBox: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12, marginBottom: 20 },
  info: { fontSize: 15, marginBottom: 6, color: '#444' },
  label: { fontWeight: '600', color: '#111' },
  button: { backgroundColor: '#1E90FF', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default ProductInfoCard;
