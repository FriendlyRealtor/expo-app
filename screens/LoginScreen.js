import React, {useState} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import {Formik} from 'formik';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {View, TextInput, Button, FormErrorMessage} from '../components';
import {Colors, auth} from '../config';
import {useTogglePasswordVisibility} from '../hooks';
import {loginValidationSchema} from '../utils';

export const LoginScreen = ({navigation}) => {
  const [errorState, setErrorState] = useState('');
  const {passwordVisibility, handlePasswordVisibility, rightIcon} =
    useTogglePasswordVisibility();

  const handleLogin = values => {
    const {email, password} = values;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (auth.currentUser && !auth.currentUser.emailVerified) {
          setErrorState('Head to your email and verify your account!');
        }
      })
      .catch(error => {
        switch (error.message) {
          case 'Firebase: Error (auth/wrong-password).':
            setErrorState('Wrong password!');
            break;
          case 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).':
            setErrorState(
              'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later',
            );
            break;
          default:
            setErrorState('Error signing in! Contact support');
        }
      });
  };
  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {/* LogoContainer: consits app logo and screen title */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/icon.png')}
              style={{width: 250, height: 250}}
            />
            <Text style={styles.screenTitle}>Friendly Realtor</Text>
          </View>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginValidationSchema}
            onSubmit={values => handleLogin(values)}>
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <>
                {/* Input fields */}
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
                  onBlur={handleBlur('email')}
                />
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
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
                  onBlur={handleBlur('password')}
                />
                <FormErrorMessage
                  error={errors.password}
                  visible={touched.password}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== '' ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Login button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Login</Text>
                </Button>
              </>
            )}
          </Formik>
          {/* Button to navigate to SignupScreen to Create Account */}
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={'Create Account?'}
            onPress={() => navigation.navigate('Signup')}
          />
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={'Forgot Password'}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
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
    paddingTop: 20,
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.orange,
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
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
