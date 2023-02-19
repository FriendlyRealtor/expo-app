import React from 'react';
import {
  View,
  Animated,
  BackHandler,
  FlatList,
  Dimensions,
  Text,
  Pressable,
} from 'react-native';
import {default as FormUserNameView} from './component/FormUserName';
import {default as FormPasswordView} from './component/FormPassowrd';
import {AppStyle} from '../../assets/style';
import {Style} from '../../assets/style/login';
import Auth from '../../components/Layout/Auth';
const width = Dimensions.get('window').width;
const FormForgotPassword = ['import username', 'import new password'];
export default ({navigation, route}) => {
  const formAnimated = React.useRef(new Animated.Value(0)).current;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('');
  const [countStep, setCountStep] = React.useState(0);
  const flatListRef = React.useRef(null);
  const FormAnimateHandle = () => {
    setTimeout(() => {
      Animated.timing(formAnimated, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }, 150);
  };

  const FormAnimatedCloseHandl = () => {
    try {
      navigation.goBack();
      Animated.timing(formAnimated, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    } catch (e) {}
  };
  const moveToQues = index => {
    flatListRef.current.scrollToOffset({offset: index * width});
  };
  React.useEffect(() => {
    FormAnimateHandle();
    const onBackPress = () => {
      FormAnimatedCloseHandl();
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
  React.useEffect(() => {
    moveToQues(countStep);
  }, [countStep]);

  const FormUserName = () => {
    return (
      <FormUserNameView
        item={null}
        username={username}
        onPress={() => {
          setCountStep(step => step + 1);
        }}
        onChangeValue={text => setUsername(text)}
      />
    );
  };
  const FormPassword = () => {
    return (
      <FormPasswordView
        password={password}
        setPassword={text => setPassword(text)}
        confirmPassword={rePassword}
        setConfirmPassword={text => setRePassword(text)}
        onPress={() => navigation.goBack()}
      />
    );
  };
  const renderItem = ({item, index}) => {
    if (index == 0) return FormUserName();
    return FormPassword();
  };
  const footer = () => (
    <View
      style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}
    >
      <Text style={[AppStyle.style.p, Style.color]}>
        Already have an Account?{' '}
      </Text>
      <Pressable onPress={FormAnimatedCloseHandl}>
        <Text style={[AppStyle.style.p, {color: '#F9E0AE'}]}>LOGIN</Text>
      </Pressable>
    </View>
  );
  return (
    <Auth footer={footer} containerStyle={{paddingHorizontal: 0}}>
      <Animated.Text
        style={[
          Style.color,
          {
            textAlign: 'center',
            marginTop: 15,
            marginHorizontal: 15,
            opacity: formAnimated,
          },
        ]}
      >
        {countStep == 0
          ? 'Please Enter your email address and we will send your password by email Immediately.'
          : 'Please Enter your New Password'}
      </Animated.Text>
      <FlatList
        ref={ref => (flatListRef.current = ref)}
        data={FormForgotPassword}
        keyExtractor={(item, index) => item}
        renderItem={renderItem}
        initialNumToRender={1}
        scrollEnabled={false}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </Auth>
  );
};
