/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import {
  View,
} from 'react-native';
import AppNavigation from './src/navigations';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
const App: () => Node = () => {
  return (
    <PaperProvider theme={{
      ...DefaultTheme,
      colors: {
        background: '#F9F9F9',
        placeholder: 'grey',
        primary: '#F9E0AE',
        secondary: '#FC8621',
        active: "#EC5858",
        error: "#EC5858",
        bottomNavigationActive: '#682C0E',
        text: "black",
        logoColor: "white"
      }
    }}>
      <View style={{ flex: 1 }}>
        <AppNavigation />
      </View>
    </PaperProvider>
  );
};
export default App;
