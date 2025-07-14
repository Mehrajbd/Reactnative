import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';
import Button from '../components/Button';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [tempEmail, setTempEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const setAndLoadDummyCredentials = async () => {
      // Set dummy credentials if not already stored
      const existingEmail = await AsyncStorage.getItem('temp_email');
      const existingPassword = await AsyncStorage.getItem('temp_password');

      if (!existingEmail && !existingPassword) {
        await AsyncStorage.setItem('temp_email', 'test@gmail.com');
        await AsyncStorage.setItem('temp_password', '123456');
        console.log('Dummy credentials set.');
      }

      // Load them into state
      const storedEmail = await AsyncStorage.getItem('temp_email');
      const storedPassword = await AsyncStorage.getItem('temp_password');
      if (storedEmail) setTempEmail(storedEmail);
      if (storedPassword) setTempPassword(storedPassword);
    };

    setAndLoadDummyCredentials();
  }, []);

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

    if (email !== tempEmail || password !== tempPassword) {
      Alert.alert('Failed', 'Email or Password does not match');
      return;
    }

    try {
      setIsLoading(true);

      const user = { email, password };
      await AsyncStorage.setItem('signedInUser', JSON.stringify(user));
      await AsyncStorage.setItem('user_email', email);
      await AsyncStorage.setItem('user_password', password);
      await AsyncStorage.removeItem('temp_email');
      await AsyncStorage.removeItem('temp_password');

      setTimeout(() => {
        setIsLoading(false);
        Alert.alert('Success', 'Sign Up Successful!', [
          { text: 'OK', onPress: () => navigation.replace('Home') },
        ]);
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  return (
    <View style={styles.container}>
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

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text style={styles.loadingText}>Logging in...</Text>
        </View>
      ) : (
        <Button title="Log In" onPress={handleSignUp} />
      )}
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
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
  },
});
