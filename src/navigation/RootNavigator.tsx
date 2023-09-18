import { ChatScreen, DistancePropertiesScreen, HomeScreen } from '../screens';
import React, { useEffect, useState, useRef } from 'react';
import { SplashScreen, UserChatScreen } from '../screens';
import { inject, observer } from 'mobx-react';
import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';
import Bugsnag from '@bugsnag/expo';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '../config';
import { createStackNavigator } from '@react-navigation/stack';
import { getTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { useNativeBaseTheme } from '../hooks';
import { setDebugModeEnabled } from 'expo-firebase-analytics';

const Stack = createStackNavigator();

export const RootNavigator = inject('appStore')(
  observer(({ appStore }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { user, retrieveLoggedInUser } = appStore;
    const [localUser, setLocalUser] = useState(undefined);

    useEffect(() => {
      if (__DEV__) {
        setDebugModeEnabled(true);
      }

      const fetchUser = async () => {
        await retrieveLoggedInUser();
      };

      fetchUser();
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setLocalUser(user);
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    }, []);

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

    return (
      <NativeBaseProvider>
        <NavigationContainer>
          {user && localUser && auth?.currentUser?.emailVerified ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={AppTabs}
                initialParams={{
                  user: localUser,
                  currentUser: user,
                }}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="CMA" component={HomeScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="Distance Properties" component={DistancePropertiesScreen} />
              <Stack.Screen name="My Chat" component={UserChatScreen} />
            </Stack.Navigator>
          ) : (
            <AuthStack />
          )}
        </NavigationContainer>
      </NativeBaseProvider>
    );
  }),
);
