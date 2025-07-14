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
import { SECTION_DATA } from '../utils/sectionData'; 

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
        sections={SECTION_DATA}
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
