import { Alert, Image, Linking, SafeAreaView, TouchableOpacity } from 'react-native';
import { ErrorMessage } from '../../components';
import { Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import { auth, db, Colors } from '../../config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { inject, observer } from 'mobx-react';

import Bugsnag from '@bugsnag/expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SignupScreenStyles } from './SignupScreenStyles';
import { StatusBar } from 'expo-status-bar';
import { signupValidationSchema } from '../../utils';
import { useTogglePasswordVisibility } from '../../hooks';
import { Button, IconButton, ScrollView, View, Text, Input, FormControl, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

      // Trim values to remove leading and trailing spaces
      const trimmedValues = {
        email: email.trim(),
        password,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        userName: userName.trim(),
      };

      try {
        setIsLoading(true);
        const doesUserNameExists = await checkUsernameExists(trimmedValues.userName);
        if (doesUserNameExists) {
          throw new Error('Username already exists');
        }

        const res = await createUserWithEmailAndPassword(
          auth,
          trimmedValues.email,
          trimmedValues.password,
        );
        await sendEmailVerification(res.user);
        Alert.alert('Email Verification sent.');
        await setDoc(doc(db, 'users', res.user.uid), {
          name: `${trimmedValues.firstName} ${trimmedValues.lastName}`,
          ceRenewalDate: new Date(),
          userName: trimmedValues.userName,
          emailAddress: trimmedValues.email,
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
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <StatusBar style="auto" />
        <ScrollView>
          <KeyboardAwareScrollView>
            <Formik>
              {() => (
                <View isSafe style={styles.container}>
                  <Text fontSize={32} fontWeight={500}>
                    Sign Up
                  </Text>
                  <Text style={{ color: 'red', fontWeight: 'bold', marginBottom: 16 }}>
                    * Please complete all fields.
                  </Text>
                  {errorState !== '' ? <ErrorMessage error={errorState} visible={true} /> : null}
                  <FormControl.Label>First Name</FormControl.Label>
                  <Input
                    name="firstName"
                    placeholder="Enter your First Name"
                    autoCapitalize="none"
                    autoFocus={true}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    my={1}
                  />
                  <ErrorMessage error={errors.firstName} visible={touched.firstName} />
                  <FormControl.Label>Last Name</FormControl.Label>
                  <Input
                    name="lastName"
                    placeholder="Enter your Last Name"
                    autoCapitalize="none"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    my={1}
                  />
                  <ErrorMessage error={errors.lastName} visible={touched.lastName} />
                  <FormControl.Label>User Name</FormControl.Label>
                  <Input
                    name="username"
                    placeholder="User Name"
                    autoCapitalize="none"
                    value={values.userName}
                    onChangeText={handleChange('userName')}
                    onBlur={handleBlur('userName')}
                    my={1}
                  />

                  <ErrorMessage error={errors.userName} visible={touched.userName} />
                  <FormControl.Label>Email</FormControl.Label>
                  <Input
                    name="email"
                    placeholder="Enter your Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    leftElement={<Icon as={MaterialCommunityIcons} name="email" size="sm" ml={2} />}
                    my={1}
                  />
                  <ErrorMessage error={errors.email} visible={touched.email} />
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    name="password"
                    placeholder="Enter your Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType="newPassword"
                    my={1}
                    rightElement={
                      <IconButton
                        onPress={handlePasswordVisibility}
                        _pressed={{
                          bg: 'transparent',
                        }}
                        height={1}
                      >
                        <Icon
                          as={MaterialCommunityIcons}
                          name={passwordVisibility ? 'eye' : 'eye-off'}
                          size="sm"
                          mr={2}
                        />
                      </IconButton>
                    }
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  <ErrorMessage error={errors.password} visible={touched.password} />
                  <FormControl.Label>Confirm Password</FormControl.Label>
                  <Input
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={confirmPasswordVisibility}
                    textContentType="password"
                    rightElement={
                      <IconButton
                        onPress={handleConfirmPasswordVisibility}
                        _pressed={{
                          bg: 'transparent',
                        }}
                        height={1}
                      >
                        <Icon
                          as={MaterialCommunityIcons}
                          name={confirmPasswordVisibility ? 'eye' : 'eye-off'}
                          size="sm"
                          mr={2}
                        />
                      </IconButton>
                    }
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    my={1}
                  />

                  <ErrorMessage error={errors.confirmPassword} visible={touched.confirmPassword} />
                  <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>
                    By clicking Sign Up, you are agreeing to JubileeInvestmentLLC's
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://app.termly.io/document/terms-and-conditions/22db5147-f672-4e1a-8ce9-0568d1c88332',
                        )
                      }
                    >
                      <Text color={Colors.blue}>Terms of Service </Text>
                    </TouchableOpacity>
                    and are acknowledging our{' '}
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(
                          'https://app.termly.io/document/privacy-policy/73841773-0c89-4160-9269-9bc3ba0a4dbd',
                        )
                      }
                    >
                      <Text color={Colors.blue}>Privacy Notice</Text>
                    </TouchableOpacity>
                    applies.
                  </Text>
                  <Button
                    onPress={handleSubmit}
                    isLoading={isLoading}
                    backgroundColor={Colors.blue}
                    mt={8}
                  >
                    <Text style={styles.buttonText} color="white">
                      Sign Up
                    </Text>
                  </Button>
                </View>
              )}
            </Formik>
            <Button
              onPress={() => navigation.navigate('Login')}
              backgroundColor={Colors.transparent}
              mt={2}
            >
              <Text color={Colors.blue}>Already have an account?</Text>
            </Button>
          </KeyboardAwareScrollView>
        </ScrollView>
      </SafeAreaView>
    );
  }),
);
