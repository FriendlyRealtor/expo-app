import { ChatScreen, DistancePropertiesScreen, HomeScreen } from '../screens';
import React, { useEffect, useState } from 'react';
import { SplashScreen, UserChatScreen } from '../screens';
import { inject, observer } from 'mobx-react';

import { AppTabs } from './AppTabs';
import { AuthStack } from './AuthStack';
import Bugsnag from '@bugsnag/expo';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from '../config';
import { createStackNavigator } from '@react-navigation/stack';
import { getTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();
export const RootNavigator = inject('appStore')(
  observer(({ appStore }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fontsLoaded] = useFonts({
      Ubuntu: require('../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
    });

    const { user, retrieveLoggedInUser } = appStore;

    useEffect(() => {
      const retrieveUser = async () => {
        await retrieveLoggedInUser();
      };

      retrieveUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (fontsLoaded) {
        setIsLoading(false);
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

    return (
      <NavigationContainer>
        {user && auth.currentUser && auth.currentUser.emailVerified ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={AppTabs}
              initialParams={{
                user: JSON.stringify(user),
                currentUser: JSON.stringify(auth.currentUser),
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
    );
  }),
);
