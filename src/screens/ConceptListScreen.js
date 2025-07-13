import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { concepts } from '../utils/concepts';

const ConceptListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Learned Concepts</Text>
      <FlatList
        data={concepts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
    color: 'dodgerblue',
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: 'darkslategray',
  },
});

export default ConceptListScreen;
