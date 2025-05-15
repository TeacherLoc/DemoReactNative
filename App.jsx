
import React from 'react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {AuthProvider} from './src/GiuaKy/contexts/AuthContext';
import {CartProvider} from './src/GiuaKy/contexts/CartContext';
import RootNavigator from './src/GiuaKy/navigation/RootNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4',
  },
};

const GiuaKyApp = () => {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <RootNavigator />
        </CartProvider>
      </AuthProvider>
    </PaperProvider>
  );
};

export default GiuaKyApp;
