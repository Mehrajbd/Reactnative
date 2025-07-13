
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>This is a dummy product description.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 250, borderRadius: 8 },
  name: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  price: { fontSize: 18, color: 'green', marginBottom: 10 },
  description: { fontSize: 16, lineHeight: 22 },
});

export default ProductDetailScreen;
