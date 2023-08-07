import { Alert, Image, Linking, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Button, FormErrorMessage, Loading, Text, TextInput, View } from '../../components';
import { Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import { auth, db } from '../../config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { inject, observer } from 'mobx-react';

import Bugsnag from '@bugsnag/expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SignupScreenStyles } from './SignupScreenStyles';
import { StatusBar } from 'expo-status-bar';
import { signupValidationSchema } from '../../utils';
import { useTogglePasswordVisibility } from '../../hooks';

export const SignupScreen = inject('appStore')(
  observer(({ appStore, navigation }) => {
    const styles = SignupScreenStyles;
    const { values, touched, errors, handleChange, handleSubmit, handleBlur, resetForm } =
      useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        validationSchema: signupValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
          handleSignup(values);
        },
      });

    const [errorState, setErrorState] = useState<string>('');

    const {
      passwordVisibility,
      handlePasswordVisibility,
      rightIcon,
      handleConfirmPasswordVisibility,
      confirmPasswordIcon,
      confirmPasswordVisibility,
    } = useTogglePasswordVisibility();

    const handleSignup = async (values) => {
      const { email, password, firstName, lastName, userName } = values;
      const { checkUsernameExists } = appStore;

      try {
        const doesUserNameExists = await checkUsernameExists(userName);
        if (doesUserNameExists) {
          throw new Error('Username already exists');
        }

        const res = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(res.user);
        Alert.alert('Email Verification sent.');
        await setDoc(doc(db, 'users', res.user.uid), {
          name: `${firstName} ${lastName}`,
          ceRenewalDate: new Date(),
          userName: userName,
          emailAddress: email,
          photo:
            'https://firebasestorage.googleapis.com/v0/b/real-estate-app-9a719.appspot.com/o/default_photo%2Fimg_avatar.png?alt=media&token=ca7c1413-f7ea-4511-915a-699283568edc',
        });
        navigation.navigate('Login');
        resetForm({});
      } catch (error) {
        Bugsnag.notify(error);
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrorState('Email already in use, try another one.');
            break;
          case 'auth/invalid-email':
            setErrorState('Please enter a valid email!');
            break;
          case 'auth/weak-password':
            setErrorState('Please enter a stronger password!');
            break;
          case undefined:
            setErrorState(error.message as string);
            break;
          default:
            setErrorState(`Contact Support contact@friendlyrealtor.app ${error.message}`);
        }
      }
    };

    return (
      <SafeAreaView>
        <StatusBar style="auto" />
        <ScrollView>
          <KeyboardAwareScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Button onPress={() => navigation.goBack()}>
                <Icon style={{ marginLeft: 64 }} name="chevron-left" size={24} />
              </Button>
              <View style={styles.logoContainer}>
                <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                <Text style={styles.screenTitle}>Sign Up!</Text>
              </View>
            </View>
            <Formik>
              {() => (
                <View isSafe style={styles.container}>
                  <Text category="p1">* Please complete all fields.</Text>
                  {errorState !== '' ? (
                    <FormErrorMessage error={errorState} visible={true} />
                  ) : null}
                  <TextInput
                    name="firstName"
                    placeholder="First Name"
                    autoCapitalize="none"
                    autoFocus={true}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                  />
                  <FormErrorMessage error={errors.firstName} visible={touched.firstName} />
                  <TextInput
                    name="lastName"
                    placeholder="Last Name"
                    autoCapitalize="none"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                  />
                  <FormErrorMessage error={errors.lastName} visible={touched.lastName} />
                  <TextInput
                    name="username"
                    placeholder="User Name"
                    autoCapitalize="none"
                    value={values.userName}
                    onChangeText={handleChange('userName')}
                    onBlur={handleBlur('userName')}
                  />
                  <FormErrorMessage error={errors.userName} visible={touched.userName} />
                  <TextInput
                    name="email"
                    leftIconName="email"
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  <FormErrorMessage error={errors.email} visible={touched.email} />
                  <TextInput
                    name="password"
                    leftIconName="key-variant"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType="newPassword"
                    rightIcon={rightIcon}
                    handlePasswordVisibility={handlePasswordVisibility}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  <FormErrorMessage error={errors.password} visible={touched.password} />
                  <TextInput
                    name="confirmPassword"
                    leftIconName="key-variant"
                    placeholder="Confirm password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={confirmPasswordVisibility}
                    textContentType="password"
                    rightIcon={confirmPasswordIcon}
                    handlePasswordVisibility={handleConfirmPasswordVisibility}
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                  />
                  <FormErrorMessage
                    error={errors.confirmPassword}
                    visible={touched.confirmPassword}
                  />
                  <Text
                    appearance="hint"
                    style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}
                  >
                    By clicking Sign Up, you are agreeing to JubileeInvestmentLLC's
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://app.termly.io/document/terms-and-conditions/22db5147-f672-4e1a-8ce9-0568d1c88332',
                        )
                      }
                    >
                      <Text category="label" appearance="hint" status="info">
                        Terms of Service
                      </Text>
                    </TouchableOpacity>
                    and are acknowledging our{' '}
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://app.termly.io/document/privacy-policy/73841773-0c89-4160-9269-9bc3ba0a4dbd',
                        )
                      }
                    >
                      <Text category="label" appearance="hint" status="info">
                        Privacy Notice
                      </Text>
                    </TouchableOpacity>
                    applies.
                  </Text>
                  <Button style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Signup</Text>
                  </Button>
                </View>
              )}
            </Formik>
            <Button
              style={styles.borderlessButtonContainer}
              borderless
              title={'Already have an account?'}
              onPress={() => navigation.navigate('Login')}
            />
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }),
);
