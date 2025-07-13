import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ScrollExamplesScreen from '../screens/ScrollExamplesScreen';
import TextInputExampleScreen from '../screens/TextInputExampleScreen';
import SectionListExample  from '../screens/SectionListExample';
import ConceptListScreen from '../screens/ConceptListScreen';

const Stack = createNativeStackNavigator();
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'All Products',
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: 'Product Detail' }}
      />
  <Stack.Screen name="ScrollExamples" component={ScrollExamplesScreen} options={{ title: 'Scroll Examples' }} />
  <Stack.Screen
  name="TextInputExample"
  component={TextInputExampleScreen}
  options={{ title: 'Text Input Example' }}
/>
<Stack.Screen name="SectionListExample" component={SectionListExample} />

<Stack.Screen name="ConceptListScreen" component={ConceptListScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
