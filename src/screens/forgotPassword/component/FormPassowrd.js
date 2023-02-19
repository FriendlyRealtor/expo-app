import React from 'react';
import {View, Dimensions} from 'react-native';
import {default as Input} from '../../../components/Elements/Input';
import {default as Button} from '../../../components/Elements/Button';
import {Style} from '../../../assets/style/login';
const width = Dimensions.get('window').width;
export default ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onPress = () => {},
}) => {
  return (
    <View style={[{flex: 1, width: width, paddingHorizontal: 15}]}>
      <View style={{flex: 1}}>
        <Input
          label="New Password*"
          value={password}
          changeValue={setPassword}
          inputContainerStyle={Style.inputContainer}
          labelStyle={{color: 'white'}}
          inputStyle={{color: 'white'}}
          secureTextEntry={true}
          max={15}
        />
        <Input
          label="Confirm Password*"
          value={confirmPassword}
          changeValue={setConfirmPassword}
          inputContainerStyle={Style.inputContainer}
          labelStyle={{color: 'white'}}
          inputStyle={{color: 'white'}}
          secureTextEntry={true}
          max={15}
        />
      </View>
      <Button
        label="Reset Password"
        containerStyle={{width: '100%'}}
        onPress={onPress}
        style={{marginBottom: 15}}
      />
    </View>
  );
};
