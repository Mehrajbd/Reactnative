import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';

const ScrollExamplesScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ScrollView Examples</Text>

      <Text style={styles.section}>1️ Simple Text</Text>
      <Text style={styles.item}>This is a simple scrollable text block.</Text>

      <Text style={styles.section}>2️ Image from Internet</Text>
      <Image
        source={{ uri: 'https://picsum.photos/300/200' }}
        style={styles.image}
      />
      <Text style={styles.item}>This image is displayed inside a ScrollView.</Text>

      <Text style={styles.section}>3️ Horizontal Scroll</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.box}>
            <Text style={styles.boxText}>Box {item}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.section}>4️ List Example</Text>
      {[1, 2, 3, 4, 5].map((i) => (
        <View key={i} style={styles.listItem}>
          <Text>✔️ Scrollable List Item {i}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white', 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  item: {
    fontSize: 16,
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  box: {
    width: 120,
    height: 80,
    backgroundColor: 'lightgray', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  boxText: {
    fontWeight: 'bold',
  },
  listItem: {
    backgroundColor: 'gainsboro', 
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
  },
});

export default ScrollExamplesScreen;
