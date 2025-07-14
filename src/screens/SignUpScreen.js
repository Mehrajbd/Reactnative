
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';
import Button from '../components/Button';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
  const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format';

    if (!password.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };

const handleSignUp = async () => {
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    const saved = await AsyncStorage.getItem('signedInUser');
    const signedInUser = saved ? JSON.parse(saved) : null;

    if (
      signedInUser &&
      signedInUser.email === email &&
      signedInUser.password === password
    ) {
      Alert.alert('Success', 'Sign Up Successful!', [
        { text: 'OK', onPress: () => navigation.replace('Home') },
      ]);
    } else {
      Alert.alert('Error', 'Invalid email or password.');
    }
  } catch (err) {
    Alert.alert('Error', 'Something went wrong!');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <InputField
      label="Email"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
      />
      <InputField
      label="Password"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        showToggle
        showPassword={showPassword}
        onTogglePress={() => setShowPassword(!showPassword)}
        error={errors.password}
      />

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
});
