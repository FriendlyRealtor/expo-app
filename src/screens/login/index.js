import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Alert,
  Image,
  Keyboard,
  TextInput,
  I18nManager,
} from 'react-native';
import {default as Input} from '../../components/Elements/Input';
import {default as Button} from '../../components/Elements/Button';

import {default as Layout} from '../../components/Layout/Auth';
import {RouteName} from '../../helper/RouteName';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {AppStyle} from '../../assets/style';
import {Style} from '../../assets/style/login';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useOnboardingConfig} from '../../hooks/useOnboardingConfig';
import {useAuth} from '../../hooks/useAuth';

const width = Dimensions.get('window').width;
export default ({navigation, route}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const authManager = useAuth();
  const {config} = useOnboardingConfig();

  const onPressLogin = () => {
    setLoading(true);
    authManager
      .loginWithEmailAndPassword(
        email && email.trim(),
        password && password.trim(),
        config,
      )
      .then(response => {
        if (response?.user) {
          const user = response.user;
          Keyboard.dismiss();
          navigation.reset({
            index: 0,
            routes: [{name: 'MainStack', params: {user}}],
          });
        } else {
          setLoading(false);
          Alert.alert('', [{text: 'OK'}], {
            cancelable: false,
          });
        }
      });
  };

  const onFBButtonPress = () => {
    setLoading(true);
    authManager.loginOrSignUpWithFacebook(config).then(response => {
      if (response?.user) {
        const user = response.user;
        Keyboard.dismiss();
        navigation.reset({
          index: 0,
          routes: [{name: 'MainStack', params: {user}}],
        });
      } else {
        setLoading(false);
        Alert.alert('', [{text: 'OK'}], {
          cancelable: false,
        });
      }
    });
  };

  const onGoogleButtonPress = () => {
    setLoading(true);
    authManager.loginOrSignUpWithGoogle(config).then(response => {
      if (response?.user) {
        const user = response.user;
        Keyboard.dismiss();
        navigation.reset({
          index: 0,
          routes: [{name: 'MainStack', params: {user}}],
        });
      } else {
        setLoading(false);
        Alert.alert('', [{text: 'OK'}], {
          cancelable: false,
        });
      }
    });
  };

  const onAppleButtonPress = async () => {
    setLoading(true);
    authManager.loginOrSignUpWithApple(config).then(response => {
      if (response?.user) {
        const user = response.user;
        Keyboard.dismiss();
        navigation.reset({
          index: 0,
          routes: [{name: 'MainStack', params: {user}}],
        });
      } else {
        setLoading(false);
        Alert.alert('', [{text: 'OK'}], {
          cancelable: false,
        });
      }
    });
  };

  const onForgotPassword = async () => {
    navigation.push('ResetPassword', {
      isResetPassword: true,
    });
  };

  const submit = () => {
    navigation.replace(RouteName.Main);
  };

  const footer = () => (
    <View style={{alignItems: 'center'}}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}
      >
        <Text style={[AppStyle.style.p, Style.color]}>
          Don't have an Account?{' '}
        </Text>
        <Pressable onPress={() => navigation.navigate(RouteName.Register)}>
          <Text style={[AppStyle.style.p, {color: '#F9E0AE'}]}>
            REGISTER NOW!
          </Text>
        </Pressable>
      </View>
    </View>
  );
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ffffff'}}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always"
      >
        <TouchableOpacity
          style={{alignSelf: 'flex-start'}}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={{
              resizeMode: 'contain',
              tintColor: '#6546d7',
              width: 25,
              height: 25,
              marginTop: Platform.OS === 'ios' ? 50 : 20,
              marginLeft: 10,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
            }}
            source="../../assets/icons/backArrow.png"
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: '#6546d7',
            marginTop: 25,
            marginBottom: 20,
            alignSelf: 'stretch',
            textAlign: 'left',
            marginLeft: 30,
          }}
        >
          Sign In
        </Text>
        <TextInput
          style={{
            height: 42,
            borderWidth: 1,
            borderColor: '#2a2a2a',
            backgroundColor: '#ffffff',
            paddingLeft: 20,
            color: '#151723',
            width: '80%',
            alignSelf: 'center',
            marginTop: 20,
            alignItems: 'center',
            borderRadius: 25,
            textAlign: I18nManager.isRTL ? 'right' : 'left',
          }}
          placeholder="E-mail"
          keyboardType="email-address"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={{
            height: 42,
            borderWidth: 1,
            borderColor: '#2a2a2a',
            backgroundColor: '#ffffff',
            paddingLeft: 20,
            color: '#151723',
            width: '80%',
            alignSelf: 'center',
            marginTop: 20,
            alignItems: 'center',
            borderRadius: 25,
            textAlign: I18nManager.isRTL ? 'right' : 'left',
          }}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {config && config.forgotPasswordEnabled && (
          <View
            style={{
              width: '80%',
              alignSelf: 'center',
              alignItems: 'flex-end',
              marginTop: 8,
            }}
          >
            <Button
              style={{
                fontSize: 14,
                padding: 4,
              }}
              onPress={() => onForgotPassword()}
              label="Forgot Password"
            />
          </View>
        )}
        <Button
          containerStyle={{
            width: '70%',
            backgroundColor: '#6546d7',
            borderRadius: 25,
            padding: 10,
            marginTop: 30,
            alignSelf: 'center',
          }}
          style={{color: '#ffffff'}}
          onPress={() => onPressLogin()}
          label="Log In"
        />
        {config && config.isFacebookAuthEnabled && (
          <>
            <Text
              style={{
                color: '#151723',
                marginTop: 40,
                marginBottom: 10,
                alignSelf: 'center',
              }}
            >
              OR
            </Text>
            <Button
              containerStyle={{
                width: '70%',
                backgroundColor: '#4267B2',
                borderRadius: 25,
                padding: 10,
                marginTop: 30,
                alignSelf: 'center',
              }}
              style={{
                color: '#ffffff',
                fontSize: 14,
              }}
              onPress={() => onFBButtonPress()}
              label="Login With Facebook"
            />
          </>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};
