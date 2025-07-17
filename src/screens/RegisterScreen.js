import React, { useRef } from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';
import InputField from '../components/InputField';
import { registerUser } from '../api/authApi';

const schema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string().min(1, 'Confirm Password is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const onSubmit = async (data) => {
    try {
      const userData = {
        name: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
      };

      console.log('Sending to backend:', userData);
      const response = await registerUser(userData);

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          text2: 'Please log in now',
        });
        navigation.replace('Login');
      } else {
        Alert.alert('Registration failed', response.message || 'Try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Full Name"
              placeholder="Full Name"
              value={value}
              onChangeText={onChange}
              error={errors.fullName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Email"
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Password"
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry={true}
              inputRef={passwordRef}
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <InputField
              label="Confirm Password"
              placeholder="Confirm Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry={true}
              inputRef={confirmPasswordRef}
              error={errors.confirmPassword?.message}
            />
          )}
        />

        {isSubmitting ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="dodgerblue" />
            <Text style={styles.loadingText}>Registering...</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        )}

        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>
            Already have an account?{' '}
            <Text
              style={styles.linkHighlight}
              onPress={() => navigation.replace('Login')}
            >
              Log In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
