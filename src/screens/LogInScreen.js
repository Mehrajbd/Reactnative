import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { loginUser } from '../api/authApi';
import { useCart } from '../context/CartContext';

const schema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

const LogInScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { clearCart } = useCart();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await loginUser({
        email: data.email.trim(),
        password: data.password,
      });

      const accessToken = response?.accessToken;

      if (accessToken) {
        await AsyncStorage.setItem(
          'signedInUser',
          JSON.stringify({
            email: data.email.trim(),
            accessToken,
          })
        );

        clearCart();

        Toast.show({
          type: 'success',
          text1: 'Login Successful',
        });

        navigation.replace('Home');
      } else {
        throw new Error('Invalid login response');
      }
    } catch (error) {
      console.log('Login error:', error);
      const msg = error?.response?.data?.message || 'Something went wrong. Please try again.';
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: msg,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <InputField
            label="Email"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            value={value}
            onChangeText={onChange}
            secureTextEntry={true}
            error={errors.password?.message}
            showToggle={true}
            showPassword={showPassword}
            onTogglePress={() => setShowPassword(!showPassword)}
          />
        )}
      />

      {isSubmitting ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text style={styles.loadingText}>Logging in...</Text>
        </View>
      ) : (
        <Button title="Log In" onPress={handleSubmit(onSubmit)} />
      )}

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>New here? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Register now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogInScreen;

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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontSize: 14,
    color: '#444',
  },
  registerLink: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});
