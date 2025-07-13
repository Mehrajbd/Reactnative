import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const TextInputExampleScreen = () => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate activity when any input changes
  useEffect(() => {
    if (name || email || comment) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [name, email, comment]);

  return (
    <ScrollView style={styles.container}>
      {/* Optional Spinner */}
      {isLoading && (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="dodgerblue" />
          <Text style={styles.spinnerText}>Saving changes...</Text>
        </View>
      )}

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
  label: { fontSize: 16, fontWeight: '600', marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    backgroundColor: 'whitesmoke',
  },
  spinner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  spinnerText: {
    marginLeft: 10,
    color: 'gray',
    fontSize: 14,
  },
});

export default TextInputExampleScreen;
