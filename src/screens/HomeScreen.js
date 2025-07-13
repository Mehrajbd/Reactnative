import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  StatusBar,
  ActivityIndicator,
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

  const theme = useMemo(() => ({
    backgroundColor: darkMode ? '#121212' : 'whitesmoke',
    textColor: darkMode ? '#fff' : '#000',
    cardColor: darkMode ? '#1E1E1E' : '#fff',
    buttonColor: 'dodgerblue',
  }), [darkMode]);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
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
      backgroundColor: theme.buttonColor,
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
    loaderContainer: {
      position: 'absolute',
      top: 80,
      left: 0,
      right: 0,
      zIndex: 10,
      alignItems: 'center',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 10,
    },
    headerText: {
      marginRight: 8,
      fontWeight: 'bold',
      color: theme.textColor,
    },
  }), [theme]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="dodgerblue" barStyle={darkMode ? 'light-content' : 'dark-content'} />

      {/* Header Switch */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>{darkMode ? 'Dark' : 'Light'}</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#ccc', true: '#1E90FF' }}
          thumbColor={darkMode ? '#fff' : '#f4f3f4'}
        />
      </View>

      {/* Activity Indicator during refresh */}
      {refreshing && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="dodgerblue" />
        </View>
      )}

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

export default HomeScreen;
