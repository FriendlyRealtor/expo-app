import React from 'react';
import {View, Dimensions} from 'react-native';
import {default as Input} from '../../../components/Elements/Input';
import {default as Button} from '../../../components/Elements/Button';
import {AppStyle} from '../../../assets/style';
import {Style} from '../../../assets/style/login';
const width = Dimensions.get('window').width;
export default ({
  item,
  username,
  onPress = () => {},
  onChangeValue = () => {},
}) => {
  return (
    <View style={[{width: width}, AppStyle.style.paddingHorizontalLarge]}>
      <View style={{flex: 1}}>
        <Input
          label="User Name*"
          value={username}
          changeValue={onChangeValue}
          inputContainerStyle={Style.inputContainer}
          labelStyle={{color: 'white'}}
          inputStyle={{color: 'white'}}
          max={15}
        />
        <View style={{marginBottom: 15}} />
      </View>
      <Button
        label="Send"
        containerStyle={{width: '100%'}}
        onPress={onPress}
        style={{marginBottom: 15}}
      />
    </View>
  );
};
