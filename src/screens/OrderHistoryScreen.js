import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getOrderHistory } from '../api/orderApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true); 
        const res = await getOrderHistory();
        const orderList = Array.isArray(res.data?.data) ? res.data.data : [];
        setOrders(orderList);
        await AsyncStorage.setItem('orderHistory', JSON.stringify(orderList));
      } catch (error) {
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchOrders();
  }, []);

  const renderItem = ({ item }) => {
    const paymentType = item.paymentMethod?.toUpperCase() || 'N/A';
    const paymentStatus = item.paymentStatus ? 'Paid' : 'Unpaid';

    return (
      <View style={styles.card}>
        <Text style={styles.orderId}> Order ID: {item._id}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{item.status || 'N/A'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Payment:</Text>
          <Text style={styles.value}>
            {paymentType} ({paymentStatus})
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Shipping Address:</Text>
          <Text style={styles.value}>{item.shippingAddress || 'N/A'}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>${item.totalAmount?.toFixed(2) || '0.00'}</Text>
        </View>

        <Text style={styles.sectionHeader}>Items:</Text>
        {item.items?.map((i, index) => (
          <View
            key={i._id || `${i.product?._id || 'unknown'}-${index}`}
            style={styles.itemRow}
          >
            <Text style={styles.itemName}>{i.product?.name || 'Unnamed Product'}</Text>
            <Text style={styles.itemDetail}>Qty: {i.quantity || 0}</Text>
            <Text style={styles.itemDetail}>${i.price?.toFixed(2) || '0.00'}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563eb" />
          <Text style={{ marginTop: 10, color: 'gray' }}>Loading orders...</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.empty}>No orders found.</Text>
          }
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  orderId: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
    color: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
    color: '#374151',
    width: 130,
  },
  value: {
    color: '#111827',
    flexShrink: 1,
  },
  sectionHeader: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#1f2937',
  },
  itemRow: {
    backgroundColor: '#eef2f7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 4,
  },
  itemName: {
    fontWeight: '600',
    flex: 1,
    color: '#111827',
  },
  itemDetail: {
    color: '#374151',
    marginLeft: 10,
  },
  empty: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 40,
    fontSize: 16,
  },
});
