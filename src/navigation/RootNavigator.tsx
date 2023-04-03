import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';

import { AuthStack } from './AuthStack';
import { AppTabs } from './AppTabs';
import { AuthenticatedUserContext } from '../providers';
import { SplashScreen } from '../screens';
import { auth, db } from '../config';
import { doc, getDoc } from 'firebase/firestore';
import { useFonts } from 'expo-font';

export const RootNavigator = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Ubuntu: require('../../assets/fonts/Ubuntu/Ubuntu-Regular.ttf'),
  });

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(auth, async (authenticatedUser) => {
      if (fontsLoaded) {
        setIsLoading(false);
      }

      if (authenticatedUser) {
        const { uid } = authenticatedUser;
        const docSnap = await getDoc(doc(db, 'users', uid));
        if (docSnap.exists()) {
          setUser(docSnap.data());
        }
      }
    });

    return unsubscribeAuthStateChanged;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser, fontsLoaded]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user && auth.currentUser && auth.currentUser.emailVerified ? (
        <AppTabs currentUser={auth.currentUser} />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};
