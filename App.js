import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AuthenticatedUserProvider } from './src/providers';
import { theme } from './theme';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'mobx-react';
import stores from './src/stores/stores';
import { NativeBaseProvider } from 'native-base';
import { useMaterialTheme } from './nativeBaseTheme';

const App = () => {
  const { theme: nativeBaseTheme } = useMaterialTheme();

  return (
    <Provider {...stores}>
      <AuthenticatedUserProvider>
        <SafeAreaProvider>
          <NativeBaseProvider theme={nativeBaseTheme}>
            <PaperProvider theme={theme}>
              <IconRegistry icons={[EvaIconsPack]} />
              <ApplicationProvider {...eva} theme={eva.light}>
                <RootNavigator />
              </ApplicationProvider>
            </PaperProvider>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </AuthenticatedUserProvider>
    </Provider>
  );
};

export default App;
