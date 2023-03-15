import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {onAuthStateChanged} from 'firebase/auth';

import {AuthStack} from './AuthStack';
import {AppTabs} from './AppTabs';
import {AuthenticatedUserContext} from '../providers';
import {SplashScreen} from '../screens';
import {auth, db} from '../config';
import {doc, getDoc} from 'firebase/firestore';

export const RootNavigator = () => {
  const {user, setUser} = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        if (authenticatedUser) {
          const {uid} = authenticatedUser;
          const docSnap = await getDoc(doc(db, 'users', uid));

          if (docSnap.exists()) {
            setUser(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        }
        setIsLoading(false);
      },
    );

    return unsubscribeAuthStateChanged;
  }, [user]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
