import React, { useEffect, useContext } from 'react';
import {Platform} from 'react-native';
import firebase from '@react-native-firebase/app';

const regexForNames = /^[a-zA-Z]{2,25}$/;

export const ConfigContext = React.createContext({});

export const ConfigProvider = ({children}) => {

	useEffect(() => {
		const asyncFunc = async () => {
			// Initialize Firebase
			const credentials = {
				apiKey: "AIzaSyCI0IoNQbXn3a0_QAyhPOXwpKM6Wqk1hnQ",
				authDomain: "real-estate-app-9a719.firebaseapp.com",
				projectId: "real-estate-app-9a719",
				storageBucket: "real-estate-app-9a719.appspot.com",
				messagingSenderId: "154068447777",
				appId: "1:154068447777:web:881b49a540dae817b76960",
				measurementId: "G-PLQ3PXXWJJ"
			};
			await firebase.initializeApp(credentials);
		}

		asyncFunc()
	}, [])

  const config = {
    isSMSAuthEnabled: true,
    isGoogleAuthEnabled: true,
    isAppleAuthEnabled: true,
    isFacebookAuthEnabled: true,
    forgotPasswordEnabled: true,
    appIdentifier: `io.instamobile.rn.${Platform.OS}`,
    facebookIdentifier: '285315185217069',
    webClientId:
      '1099201876026-7p9f7c1ukg55958ck45fc0bn0luilka4.apps.googleusercontent.com',
    onboardingConfig: {
      welcomeTitle: 'Instamobile',
      welcomeCaption:
        'Use this codebase to start a new Firebase mobile app in minutes.',
      walkthroughScreens: [
        {
          icon: require('../assets/icons/firebase-icon.png'),
          title: 'Firebase',
          description: 'Save weeks of hard work by using our codebase.',
        },
        {
          icon: require('../assets/icons/login-icon.png'),
          title: 'Authentication & Registration',
          description:
            'Fully integrated login and sign up flows backed by Firebase.',
        },
        {
          icon: require('../assets/icons/sms-icon.png'),
          title: 'SMS Authentication',
          description: 'End-to-end SMS OTP verification for your users.',
        },
        {
          icon: require('../assets/icons/country-picker-icon.png'),
          title: 'Country Picker',
          description: 'Country picker for phone numbers.',
        },
        {
          icon: require('../assets/icons/reset-password-icon.png'),
          title: 'Reset Password',
          description: 'Fully coded ability to reset password via e-mail.',
        },
        {
          icon: require('../assets/images/instagram.png'),
          title: 'Profile Photo Upload',
          description: 'Ability to upload profile photos to Firebase Storage.',
        },
        {
          icon: require('../assets/images/pin.png'),
          title: 'Geolocation',
          description:
            'Automatically store user location to Firestore via Geolocation API.',
        },
        {
          icon: require('../assets/images/notification.png'),
          title: 'Notifications',
          description:
            'Automatically update and store push notification tokens into Firestore.',
        },
      ],
    },
    tosLink: 'https://www.instamobile.io/eula-instachatty/',
    isUsernameFieldEnabled: false,
    smsSignupFields: [
      {
        displayName: 'First Name',
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: 'Last Name',
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: 'Username',
        type: 'default',
        editable: true,
        regex: regexForNames,
        key: 'username',
        placeholder: 'Username',
        autoCapitalize: 'none',
      },
    ],
    signupFields: [
      {
        displayName: 'First Name',
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'firstName',
        placeholder: 'First Name',
      },
      {
        displayName: 'Last Name',
        type: 'ascii-capable',
        editable: true,
        regex: regexForNames,
        key: 'lastName',
        placeholder: 'Last Name',
      },
      {
        displayName: 'Username',
        type: 'default',
        editable: true,
        regex: regexForNames,
        key: 'username',
        placeholder: 'Username',
        autoCapitalize: 'none',
      },
      {
        displayName: 'E-mail Address',
        type: 'email-address',
        editable: true,
        regex: regexForNames,
        key: 'email',
        placeholder: 'E-mail Address',
        autoCapitalize: 'none',
      },
      {
        displayName: 'Password',
        type: 'default',
        secureTextEntry: true,
        editable: true,
        regex: regexForNames,
        key: 'password',
        placeholder: 'Password',
        autoCapitalize: 'none',
      },
    ],
  };

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
