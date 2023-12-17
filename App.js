import * as eva from '@eva-design/eva';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Text, View } from 'native-base';
import { AuthenticatedUserProvider } from './src/providers';
import Bugsnag from '@bugsnag/expo';
import Constants from 'expo-constants';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'mobx-react';
import { RootNavigator } from './src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import stores from './src/stores/stores';
import { theme } from './theme';

const App = () => {
  Bugsnag.start(Constants?.manifest?.extra?.bugSnagApiKey || '');
  const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

  const ErrorView = ({ error }) => (
    <View>
      <Text>{error?.message || 'An error occurred.'}</Text>
    </View>
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorView}>
      <Provider {...stores}>
        <AuthenticatedUserProvider>
          <SafeAreaProvider>
            <PaperProvider theme={theme}>
              <IconRegistry icons={[EvaIconsPack]} />
              <ApplicationProvider {...eva} theme={eva.light}>
                <RootNavigator />
              </ApplicationProvider>
            </PaperProvider>
          </SafeAreaProvider>
        </AuthenticatedUserProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
