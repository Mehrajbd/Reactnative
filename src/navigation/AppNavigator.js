import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ScrollExamplesScreen from '../screens/ScrollExamplesScreen';
import TextInputExampleScreen from '../screens/TextInputExampleScreen';
import SectionListExample from '../screens/SectionListExample';
import ConceptListScreen from '../screens/ConceptListScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const email = await AsyncStorage.getItem('user_email');
      const password = await AsyncStorage.getItem('user_password');
      if (email && password) {
        setInitialRoute('Home');
      } else {
        setInitialRoute('SignIn');
      }
    };

    checkLogin();
  }, []);

  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Welcome To SwiftCart', headerTitleAlign: 'center' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'All Products', headerTitleAlign: 'center' }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Detail' }} />
        <Stack.Screen name="ScrollExamples" component={ScrollExamplesScreen} options={{ title: 'Scroll Examples' }} />
        <Stack.Screen name="TextInputExample" component={TextInputExampleScreen} options={{ title: 'Text Input Example' }} />
        <Stack.Screen name="SectionListExample" component={SectionListExample} options={{ title: 'Section List' }} />
        <Stack.Screen name="ConceptListScreen" component={ConceptListScreen} options={{ title: 'Concepts' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
