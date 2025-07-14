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
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../components/InputField';
import { Picker } from '@react-native-picker/picker';

const SignInScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isRegistering, setIsRegistering] = useState(false); 

  const refs = {
    fullName: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(email.trim())) newErrors.email = 'Invalid email format';
    if (!password) newErrors.password = 'Password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required';
    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!role) newErrors.role = 'Role is required';

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
      setIsRegistering(true); 
      const cleanedEmail = email.trim().toLowerCase();
      await AsyncStorage.setItem('temp_email', cleanedEmail);
      await AsyncStorage.setItem('temp_password', password);
      await AsyncStorage.setItem('temp_role', role);

      setTimeout(() => {
        setIsRegistering(false);
        navigation.replace('SignUp');
      }, 1000);
    } catch (err) {
      setIsRegistering(false);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <InputField
          label="Full Name"
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
          inputRef={refs.fullName}
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

        <Text style={styles.label}>Select Role</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
            dropdownIconColor="black"
          >
            <Picker.Item label="Select a role" value="" />
            <Picker.Item label="Buyer" value="buyer" />
            <Picker.Item label="Seller" value="seller" />
          </Picker>
        </View>
        {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

        {isRegistering ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="dodgerblue" />
            <Text style={styles.loadingText}>Registering...</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        )}

        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>
            Already have an account?{' '}
            <Text
              style={styles.linkHighlight}
              onPress={() => navigation.replace('SignUp')}
            >
              Log In
            </Text>
          </Text>
        </View>
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
  linkHighlight: {
    color: 'dodgerblue',
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    color: 'gray',
    fontSize: 14,
    textAlign: 'center',
  },
  label: {
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    color: 'black',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    height: 50,
  },
  picker: {
    color: 'black',
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    marginBottom: 10,
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
