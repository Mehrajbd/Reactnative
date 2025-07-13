import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  SectionList,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';

const DATA = [
  {
    title: 'Electronics',
    data: [
      { id: '1', name: 'Smartwatch' },
      { id: '2', name: 'Bluetooth Speaker' },
      { id: '3', name: 'Laptop' },
      { id: '10', name: 'Wireless Earbuds' },
      { id: '11', name: 'Gaming Console' },
    ],
  },
  {
    title: 'Fashion',
    data: [
      { id: '4', name: 'Denim Jeans' },
      { id: '5', name: 'Canvas Backpack' },
      { id: '6', name: 'Sunglasses' },
      { id: '12', name: 'Leather Jacket' },
      { id: '13', name: 'Sneakers' },
    ],
  },
  {
    title: 'Home Essentials',
    data: [
      { id: '7', name: 'Cookware Set' },
      { id: '8', name: 'LED Bulbs' },
      { id: '9', name: 'Bedsheets' },
      { id: '14', name: 'Room Heater' },
      { id: '15', name: 'Vacuum Cleaner' },
    ],
  },
  {
    title: 'Books & Stationery',
    data: [
      { id: '16', name: 'Notebook Set' },
      { id: '17', name: 'Fountain Pen' },
      { id: '18', name: 'Highlighter Pack' },
    ],
  },
  {
    title: 'Grocery',
    data: [
      { id: '19', name: 'Organic Rice' },
      { id: '20', name: 'Cooking Oil' },
      { id: '21', name: 'Green Tea' },
    ],
  },
  {
    title: 'Toys & Games',
    data: [
      { id: '22', name: 'Lego Set' },
      { id: '23', name: 'Remote Car' },
      { id: '24', name: 'Puzzle Board' },
    ],
  },
];


const SectionListExample = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); 
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item.id + index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderSectionHeader={({ section: { title, data } }) => (
          <View>
            <Text style={styles.header}>{title}</Text>

            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemBox}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              )}
              scrollEnabled={false} 
            />
          </View>
        )}
        renderItem={() => null} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  header: {
    backgroundColor: 'dodgerblue', 
    color: 'white', 
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 6,
    margin: 6,
  },
  itemBox: {
    backgroundColor: 'gainsboro', 
    padding: 10,
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  itemText: {
    fontSize: 14,
  },
});

export default SectionListExample;
