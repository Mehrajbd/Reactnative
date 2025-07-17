import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import Toast from 'react-native-toast-message'; // ✅ Import toast

const App = () => {
  return (
    <CartProvider>
      <>
        <AppNavigator />
        <Toast /> {/* ✅ Toast component added here */}
      </>
    </CartProvider>
  );
};

export default App;
