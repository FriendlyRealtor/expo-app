import React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {default as Input} from '../Elements/Input';
import {Style as LoginStyle} from '../../assets/style/login';
import {AppStyle} from '../../assets/style';
const width = Dimensions.get('window').width;
const Style = {
  sexContainer: {
    paddingVertical: width * 0.03,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
export default ({isSubmit, onSubmit = () => {}}) => {
  const [error, setError] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [sex, setSex] = React.useState(0);
  return (
    <View
      style={[{width: width, flex: 1}, AppStyle.style.paddingHorizontalLarge]}
    >
      <Input
        label="User Name*"
        value={username}
        changeValue={text => setUsername(text)}
        inputContainerStyle={LoginStyle.inputContainer}
        labelStyle={{color: 'white'}}
        inputStyle={{color: 'white'}}
        error={error ? error.errorUser : undefined}
        errorStyle={{color: AppStyle.color.white}}
        max={15}
      />
      <Input
        label="Email*"
        value={email}
        changeValue={text => setEmail(text)}
        inputContainerStyle={LoginStyle.inputContainer}
        labelStyle={{color: 'white'}}
        inputStyle={{color: 'white'}}
        error={error ? error.errorEmail : undefined}
        errorStyle={{color: AppStyle.color.white}}
      />
      <Input
        label="Password*"
        value={password}
        changeValue={text => setPassword(text)}
        inputContainerStyle={LoginStyle.inputContainer}
        labelStyle={{color: 'white'}}
        inputStyle={{color: 'white'}}
        max={15}
        error={error ? error.errorPassword : undefined}
        errorStyle={{color: AppStyle.color.white}}
        secureTextEntry={true}
      />
      <View
        style={[
          LoginStyle.inputContainer,
          {
            width: '100%',
            borderRadius: 8,
            flexDirection: 'row',
            overflow: 'hidden',
            marginTop: width * 0.02,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            borderRightColor: 'white',
            borderRightWidth: 1,
            backgroundColor: sex == 0 ? '#F9E0AE' : 'rgba(0,0,0,0)',
          }}
        >
          <TouchableOpacity
            style={Style.sexContainer}
            onPress={() => setSex(0)}
          >
            <Text style={[{color: sex == 0 ? 'black' : 'white'}]}>Man</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            borderRightColor: 'white',
            borderRightWidth: 1,
            backgroundColor: sex == 1 ? '#F9E0AE' : 'rgba(0,0,0,0)',
          }}
        >
          <TouchableOpacity
            style={Style.sexContainer}
            onPress={() => setSex(1)}
          >
            <Text style={[{color: sex == 1 ? 'black' : 'white'}]}>Women</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            borderRightColor: 'white',
            borderRightWidth: 1,
            backgroundColor: sex == 2 ? '#F9E0AE' : 'rgba(0,0,0,0)',
          }}
        >
          <TouchableOpacity
            style={Style.sexContainer}
            onPress={() => setSex(2)}
          >
            <Text style={[{color: sex == 2 ? 'black' : 'white'}]}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
