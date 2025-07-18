import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import RegisterScreen from '../screens/RegisterScreen';
import LogInScreen from '../screens/LogInScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen'; 

// Icons
import CartIcon from '../components/CartIcon';
import ProfileIcon from '../components/ProfileIcon';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await AsyncStorage.getItem('signedInUser');
        if (user) {
          setInitialRoute('Home');
        } else {
          setInitialRoute('Login');
        }
      } catch (err) {
        console.error('Login check failed:', err);
        setInitialRoute('Login');
      }
    };

    checkLogin();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Welcome To SwiftCart',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Login"
          component={LogInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: '',
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CartIcon />
                <ProfileIcon />
              </View>
            ),
            headerRightContainerStyle: { marginRight: 10 },
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            title: 'Product Detail',
            headerRight: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CartIcon />
                <ProfileIcon />
              </View>
            ),
            headerRightContainerStyle: { marginRight: 10 },
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Your Cart' }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistoryScreen}
          options={{ title: 'Your Orders' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
