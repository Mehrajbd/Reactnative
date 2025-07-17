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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { products } from '../utils/products';
import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  //hii

  return (
    <SafeAreaView style={styles.container}>
      {/* Status Bar */}
      <StatusBar backgroundColor="#1E90FF" barStyle="light-content" />

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

      {/* Buttons */}
   {/* Buttons */}
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
    backgroundColor: 'whitesmoke', 
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
});


export default HomeScreen;
