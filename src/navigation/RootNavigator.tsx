import React, { useState, useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { AppTabs } from './AppTabs';
import { SplashScreen } from '../screens';
import { useFonts } from 'expo-font';
import { auth } from '../config';
import { inject, observer } from 'mobx-react';
import { isAvailable, getTrackingPermissionsAsync, requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import {AppState} from 'react-native';

export const RootNavigator = inject('appStore')(
  observer(({ appStore }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fontsLoaded] = useFonts({
      Ubuntu: require('../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
    });

		const appState = useRef(AppState.currentState);
		const [appStateVisible, setAppStateVisible] = useState(appState.current);

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
							if (appStateVisible === 'active' && isAvailable()) {
								const { status } = await requestTrackingPermissionsAsync();

								if (status === 'granted') {
									console.log('Yay can track user');
								} else {
									console.log('Do not allow to track user');
								}
							}
					} catch (error) {
						console.log('error calling this function', error);
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
          <AppTabs currentUser={auth.currentUser} user={user} />
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    );
  }),
);
