import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';

const SignInScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const refs = {
    fullName: useRef(null),
    username: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    contact: useRef(null),
    address: useRef(null),
  };

const validate = () => {
  const newErrors = {};
  const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
  if (!username.trim()) newErrors.username = 'Username is required';
  if (!email.trim()) newErrors.email = 'Email is required';
  else if (!emailRegex.test(email.trim())) newErrors.email = 'Invalid email format';
  if (!password) newErrors.password = 'Password is required';
  if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
  if (password && confirmPassword && password !== confirmPassword)
    newErrors.confirmPassword = 'Passwords do not match';
  if (!contact.trim()) newErrors.contact = 'Contact number is required';
else if (!/^[0-9]{11}$/.test(contact)) newErrors.contact = 'Invalid contact number';

  if (!address.trim()) newErrors.address = 'Address is required';

  return newErrors;
};


const handleSignIn = async () => {
  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    const firstErrorField = Object.keys(validationErrors)[0];
    refs[firstErrorField]?.current?.focus();
    return;
  }

  try {
    const cleanedEmail = email.trim().toLowerCase();
    const user = { email: cleanedEmail, password };
    await AsyncStorage.setItem('signedInUser', JSON.stringify(user));
    Alert.alert('Success', 'Sign In Successful!', [
      { text: 'OK', onPress: () => navigation.replace('SignUp') },
    ]);
  } catch (err) {
    Alert.alert('Error', 'Failed to save user data');
  }
};


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Sign In</Text>

        <InputField
          label="Full Name"
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
          inputRef={refs.fullName}
        />
        <InputField
          label="Username"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          error={errors.username}
          inputRef={refs.username}
        />
        <InputField
          label="Email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          inputRef={refs.email}
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
          inputRef={refs.password}
        />
        <InputField
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirm}
          showToggle
          showPassword={showConfirm}
          onTogglePress={() => setShowConfirm(!showConfirm)}
          error={errors.confirmPassword}
          inputRef={refs.confirmPassword}
        />
        <InputField
          label="Contact Number"
          placeholder="Contact Number"
          value={contact}
          onChangeText={setContact}
          error={errors.contact}
          inputRef={refs.contact}
        />
        <InputField
          label="Address"
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          error={errors.address}
          inputRef={refs.address}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: 'white',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  button: {
    backgroundColor: 'dodgerblue',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
