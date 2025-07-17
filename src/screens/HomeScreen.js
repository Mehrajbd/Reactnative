import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  StatusBar,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/productApi';
import { logoutUser } from '../api/authApi';

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
      console.error(' Failed to load products:', error);
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

  const handleLogout = async () => {
    try {
      await logoutUser(); 
      Alert.alert('Logged Out', 'You have been logged out.');
      navigation.replace('Login');

    } catch (error) {
      console.error(' Logout error:', error);
      Alert.alert('Logout Failed', error?.response?.data?.message || error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar
        backgroundColor={darkMode ? '#000' : '#1E90FF'}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />

      <View style={styles.headerRow}>
        <Text style={[styles.headerTitle, { color: darkMode ? 'white' : 'black' }]}>
          All Products
        </Text>

        <View style={styles.topRight}>
          <View style={styles.switchContainer}>
            <Text style={{ color: darkMode ? 'white' : 'black', marginRight: 8 }}>
              {darkMode ? 'Dark' : 'Light'}
            </Text>
            <Switch
              value={darkMode}
              onValueChange={toggleTheme}
              thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
          </View>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => <ProductCard product={item} navigation={navigation} />}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 6,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'green',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
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

export default HomeScreen;
