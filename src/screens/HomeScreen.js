import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllProducts } from '../api/productApi';

import HeaderWithThemeSwitch from '../components/Home/HeaderWithThemeSwitch';
import ProductGrid from '../components/Home/ProductGrid';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts().finally(() => setRefreshing(false));
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);
  const themeStyles = darkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar
        backgroundColor={darkMode ? '#000' : '#1E90FF'}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />

      <HeaderWithThemeSwitch darkMode={darkMode} toggleTheme={toggleTheme} />

      <ProductGrid products={products}  refreshing={refreshing}  onRefresh={onRefresh}  navigation={navigation} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
  },
});
