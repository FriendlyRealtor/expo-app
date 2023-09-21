import { Button, ErrorMessage, Text, TextInput, View } from '../../components';
import { Colors, auth } from '../../config';
import { Formik, useFormik } from 'formik';
import { Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { isAvailable, requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';

import Bugsnag from '@bugsnag/expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SplashScreen } from '../SplashScreen';
import { StatusBar } from 'expo-status-bar';
import { loginValidationSchema } from '../../utils';
import { useTogglePasswordVisibility } from '../../hooks';

export const LoginScreen = inject('appStore')(
  observer(({ appStore, navigation }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { retrieveLoggedInUser } = appStore;

    const { values, touched, errors, handleChange, handleSubmit, resetForm } = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: (submitValues) => {
        handleLogin(submitValues);
      },
    });

    const [errorState, setErrorState] = useState('');
    const { passwordVisibility, handlePasswordVisibility, rightIcon } =
      useTogglePasswordVisibility();

    const handleLogin = async (values) => {
      setIsLoading(true); // Set isLoading to true to display the SplashScreen

      const { email, password } = values;

      try {
        await signInWithEmailAndPassword(auth, email, password);

        if (!auth.currentUser.emailVerified) {
          await sendEmailVerification(auth.currentUser);
          setErrorState('Head to your email and verify your account!');
        } else {
          if (isAvailable()) {
            await requestTrackingPermissionsAsync();
          }
          await retrieveLoggedInUser();
        }
      } catch (error) {
        Bugsnag.notify(error);

        switch (error.code) {
          case 'auth/user-not-found':
            setErrorState('User not found!');
            break;
          case 'auth/too-many-requests':
            setErrorState(
              'Try restarting the app, if error continues contact support. contact@friendlyrealtor.app',
            );
            break;
          case 'auth/wrong-password':
            setErrorState('Wrong password!');
            break;
          case 'auth/too-many-requests':
            setErrorState(
              'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later',
            );
            break;
          default:
            setErrorState(
              `Error signing in! Contact support contact@friendlyrealtor.app ${error.message}`,
            );
        }
      } finally {
        setIsLoading(false); // Set isLoading to false once the login process is completed
      }
    };

    if (isLoading) {
      return <SplashScreen />;
    }

    return (
      <View isSafe style={styles.container}>
        <StatusBar style="auto" />
        <KeyboardAwareScrollView>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/icon.png')}
              style={{ width: 250, height: 250 }}
            />
            <Text style={styles.screenTitle}>Friendly Realtor</Text>
          </View>
          <Formik validationSchema={loginValidationSchema}>
            {() => (
              <>
                {errorState !== '' ? <ErrorMessage error={errorState} visible={true} /> : null}
                <TextInput
                  name="email"
                  leftIconName="email"
                  placeholder="Enter email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                <ErrorMessage error={errors.email} visible={touched.email} />
                <TextInput
                  name="password"
                  leftIconName="key-variant"
                  placeholder="Enter password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  textContentType="password"
                  rightIcon={rightIcon}
                  handlePasswordVisibility={handlePasswordVisibility}
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
                <ErrorMessage error={errors.password} visible={touched.password} />
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </Button>
              </>
            )}
          </Formik>
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={'Create Account'}
            onPress={() => {
              resetForm({
                values: {
                  email: '',
                  password: '',
                },
              });
              navigation.navigate('Signup');
            }}
          />
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={'Forgot Password'}
            onPress={() => {
              resetForm({
                values: {
                  email: '',
                  password: '',
                },
              });
              navigation.navigate('ForgotPassword');
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    fontFamily: 'Ubuntu',
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#02FDAA',
    borderColor: '#02FDAA',
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700',
    fontFamily: 'Ubuntu',
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
