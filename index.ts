import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';
import { vexo } from 'vexo-analytics';
import App from './App';

if (!__DEV__) {
  vexo(Constants?.manifest?.extra?.vexoApiKey);
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
