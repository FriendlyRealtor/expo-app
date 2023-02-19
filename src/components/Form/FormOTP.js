import React from 'react';
import {View, Dimensions} from 'react-native';
import {default as Input} from '../Elements/Input';
import {Style} from '../../assets/style/login';
import {AppStyle} from '../../assets/style';
const width = Dimensions.get('window').width;
export default ({isSubmit}) => {
  const [error, setError] = React.useState(null);
  const [otp, setOtp] = React.useState('');
  return (
    <View style={[{width: width}, AppStyle.style.paddingHorizontalLarge]}>
      <Input
        label=""
        value={otp}
        changeValue={text => setOtp(text)}
        inputContainerStyle={Style.inputContainer}
        labelStyle={{color: 'white'}}
        inputStyle={{color: 'white', textAlign: 'center'}}
        max={4}
        keyboardType={'numeric'}
      />
    </View>
  );
};
