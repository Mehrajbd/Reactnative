import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

const concepts = [
  { id: '1', title: 'FlatList with Card UI' },
  { id: '2', title: 'ScrollView Example' },
  { id: '3', title: 'TextInput Handling' },
  { id: '4', title: 'SectionList Example' },
  { id: '5', title: 'RefreshControl in FlatList' },
  { id: '6', title: 'StatusBar Customization' },
  { id: '7', title: 'Navigation Between Screens' },
  { id: '8', title: 'Button Row with Equal Width' },
  { id: '9', title: 'Concepts Screen Design' },
];

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
