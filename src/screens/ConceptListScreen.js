import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { concepts } from '../utils/concepts';

const ConceptListScreen = () => {
  const groupedByDay = concepts.reduce((acc, concept) => {
    const dayKey = `Day ${concept.day}`;
    if (!acc[dayKey]) acc[dayKey] = [];
    acc[dayKey].push(concept);
    return acc;
  }, {});

  const renderDay = (day, items) => (
    <View key={day}>
      <Text style={styles.dayHeader}>{day}</Text>
      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Learned Concepts</Text>
      <FlatList
        data={Object.entries(groupedByDay)}
        keyExtractor={([day]) => day}
        contentContainerStyle={styles.list}
        renderItem={({ item: [day, items] }) => renderDay(day, items)}
      />
    </SafeAreaView>
  );
};

export default ConceptListScreen;

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
  dayHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: 'darkblue',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
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
