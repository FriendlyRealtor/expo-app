import React, {useEffect} from 'react';
import {View, LogBox} from 'react-native';
import AppNavigation from './src/navigations';
import {DefaultTheme} from 'react-native-paper';
import {ConfigProvider} from './src/config';
import {AuthProvider} from './src/hooks/useAuth';
import {authManager} from './src/api';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  return (
    <ConfigProvider>
      <AuthProvider authManager={authManager}>
        <AppNavigation />
      </AuthProvider>
    </ConfigProvider>
  );
};
export default App;
