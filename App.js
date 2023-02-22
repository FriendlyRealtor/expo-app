import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';;
import { RootNavigator } from './navigation/RootNavigator';
import { AuthenticatedUserProvider } from './providers';
import { theme } from './theme';

const App = () => {
  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
				<PaperProvider theme={theme}>
        	<RootNavigator />
				</PaperProvider>
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
};

export default App;
