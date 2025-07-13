import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

const TextInputExampleScreen = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');

  return (
    <ScrollView style={styles.container}>


      {/* 1. Basic Input */}
      <Text style={styles.label}>1️ Name :</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* 2. Email Input */}
      <Text style={styles.label}>2️ Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* 3. Multiline Comment */}
      <Text style={styles.label}>3️ Comment:</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Write your comment..."
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
      />

      {/* 4. Password Field */}
      <Text style={styles.label}>4️ Password Field:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
      />

      {/* 5. Read-only Field */}
      <Text style={styles.label}>5️ Read-Only Example:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#eee' }]}
        value="This is read-only"
        editable={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',  
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    backgroundColor: 'whitesmoke', 
  },
});


export default TextInputExampleScreen;
