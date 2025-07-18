import React from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import ProductCard from '../ProductCard';

const ProductGrid = ({ products, refreshing, onRefresh, navigation }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      numColumns={2}
      renderItem={({ item }) => (
        <ProductCard product={item} navigation={navigation} />
      )}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.row}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default ProductGrid;
