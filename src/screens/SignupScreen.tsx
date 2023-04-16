import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Formik, useFormik } from 'formik';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, TextInput, Text, Button, FormErrorMessage } from '../components';
import { Colors, auth, db } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { signupValidationSchema } from '../utils';

export const SignupScreen = ({ navigation }) => {
  const { values, touched, errors, handleChange, handleSubmit, handleBlur, resetForm } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      handleSignup(values);
    },
  });

  const [errorState, setErrorState] = useState('');

  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
    confirmPasswordVisibility,
  } = useTogglePasswordVisibility();

  const handleSignup = async (values) => {
    const { email, password, firstName, lastName } = values;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user).then(async () => {
          const { uid } = user;
          await setDoc(doc(db, 'users', uid), {
            name: `${firstName} ${lastName}`,
            ceRenewalDate: new Date(),
            photo:
              'https://firebasestorage.googleapis.com/v0/b/real-estate-app-9a719.appspot.com/o/default_photo%2Fimg_avatar.png?alt=media&token=ca7c1413-f7ea-4511-915a-699283568edc',
          });
          navigation.navigate('Login');
        });
      })
      .catch((error) => setErrorState(error.message));
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/icon.png')} style={{ width: 250, height: 250 }} />
          <Text style={styles.screenTitle}>Create Account!</Text>
        </View>
        <Formik validationSchema={signupValidationSchema}>
          {() => (
            <>
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
              <FormErrorMessage error={errors.confirmPassword} visible={touched.confirmPassword} />
              {/* Display Screen Error Mesages */}
              {errorState !== '' ? <FormErrorMessage error={errorState} visible={true} /> : null}
              <Text category="label" appearance="hint" style={{ marginBottom: 6 }}>
                By clicking Sign Up, you are agreeing to JubileeInvestmentLLC's
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://app.termly.io/document/terms-and-conditions/22db5147-f672-4e1a-8ce9-0568d1c88332',
                    )
                  }
                >
                  <Text
                    category="label"
                    appearance="hint"
                    status="info"
                    style={{ marginHorizontal: 5, marginTop: 22 }}
                  >
                    Terms of Service
                  </Text>
                </TouchableOpacity>
                <Text category="label" appearance="hint">
                  and are acknowledging our{' '}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://app.termly.io/document/privacy-policy/73841773-0c89-4160-9269-9bc3ba0a4dbd',
                    )
                  }
                >
                  <Text category="label" appearance="hint" status="info" style={{ marginTop: 22 }}>
                    Privacy Notice
                  </Text>
                </TouchableOpacity>
                applies.
              </Text>
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Signup</Text>
              </Button>
            </>
          )}
        </Formik>
        <Button
          style={styles.borderlessButtonContainer}
          borderless
          title={'Already have an account?'}
          onPress={() => navigation.navigate('Login')}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
