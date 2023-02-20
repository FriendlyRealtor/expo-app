/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  View, LogBox
} from 'react-native';
import AppNavigation from './src/navigations';
import {ConfigProvider} from './src/config';
import {AuthProvider} from './src/hooks/useAuth';

const App = () => {
	useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  return (
    <ConfigProvider>
			<AuthProvider>
				<AppNavigation />
			</AuthProvider>
		</ConfigProvider>

  );
};
export default App;