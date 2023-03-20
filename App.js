import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as PaperProvider} from 'react-native-paper';
import {RootNavigator} from './navigation/RootNavigator';
import {AuthenticatedUserProvider} from './providers';
import {theme} from './theme';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {FeatherIconsPack} from './components/Icons/FeatherIconsPack';

const App = () => {
  return (
    <AuthenticatedUserProvider>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <IconRegistry icons={[EvaIconsPack, FeatherIconsPack]} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <RootNavigator />
          </ApplicationProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </AuthenticatedUserProvider>
  );
};

export default App;
