import React, { useState, useCallback } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { products } from '../utils/products';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleTheme = () => setDarkMode(!darkMode);
  const themeStyles = darkMode ? darkStyles : lightStyles;
  const handleLogout = () => {
    navigation.replace('SignUp'); 
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

          {/*  Logout Button */}
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Bottom Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.bottomButton, { marginHorizontal: 4 }]}
          onPress={() => navigation.navigate('ScrollExamples')}
        >
          <Text style={styles.buttonText}>Scroll View</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomButton, { marginHorizontal: 4 }]}
          onPress={() => navigation.navigate('TextInputExample')}
        >
          <Text style={styles.buttonText}>Text Input</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomButton, { marginHorizontal: 4 }]}
          onPress={() => navigation.navigate('SectionListExample')}
        >
          <Text style={styles.buttonText}>Section List</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.bottomButton, { marginHorizontal: 4 }]}
          onPress={() => navigation.navigate('ConceptListScreen')}
        >
          <Text style={styles.buttonText}>Concepts</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  buttonRow: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButton: {
    flex: 1,
    backgroundColor: 'dodgerblue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
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
    backgroundColor: '#dc3545',
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
