import {
  LoginScreen,
  SignupScreen,
  ForgotPasswordScreen,
  EventScreen,
  SplashScreen,
  ChatScreen,
  DistancePropertiesScreen,
  HomeScreen,
  EventOrganizerScreen,
} from '../screens';
import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useFonts } from 'expo-font';
import Bugsnag from '@bugsnag/expo';
import { NativeBaseProvider, Text } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '../config';
import { createStackNavigator } from '@react-navigation/stack';
import { getTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { useNativeBaseTheme } from '../hooks';
// import { MyDrawer } from './Drawer';
import { AppTabs } from './AppTabs';
import * as Linking from 'expo-linking';

const Stack = createStackNavigator();
const prefix = Linking.createURL('/');

export const RootNavigator = inject('appStore')(
  observer(({ appStore }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { user, retrieveLoggedInUser } = appStore;

    const { theme: nativeBaseTheme } = useNativeBaseTheme();
    const [fontsLoaded] = useFonts({
      Ubuntu: require('../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          await retrieveLoggedInUser();
        } catch (error) {
          Bugsnag.notify(error);
        } finally {
          setIsLoading(false);
        }
      };

      if (fontsLoaded) {
        fetchData();
      }
    }, [fontsLoaded]);

    useEffect(() => {
      const requestTrackingData = async () => {
        try {
          const { status } = await getTrackingPermissionsAsync();

          if (status === 'granted') {
            console.log('Yay can track user');
          } else {
            console.log('Do not allow to track user');
          }
        } catch (error) {
          Bugsnag.notify(error);
        }
      };

      requestTrackingData();
    }, []);

    if (isLoading) {
      return <SplashScreen />;
    }

    const linking = {
      prefixes: [prefix],
      config: {
        screens: {
          Home: 'home',
          Signup: 'signup',
          Login: 'login',
        },
      },
    };

    return (
      <NativeBaseProvider theme={nativeBaseTheme}>
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
          {!isLoading && user && (
            <Stack.Navigator>
              <Stack.Group>
                <Stack.Screen
                  name="Home"
                  component={AppTabs}
                  initialParams={{
                    user: user,
                    currentUser: user,
                  }}
                  options={{ headerShown: false }}
                />
                {/*<Stack.Screen name="CMA" component={HomeScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
                <Stack.Screen name="Distance Properties" component={DistancePropertiesScreen} />
                <Stack.Screen name="My Chat" component={UserChatScreen} />*/}
              </Stack.Group>
            </Stack.Navigator>
          )}
          {!isLoading && user === null && (
            <Stack.Navigator
              initialRouteName="Discover Events"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="Discover Events"
                component={EventScreen}
                initialParams={{
                  user: user,
                  currentUser: user,
                }}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }),
);
